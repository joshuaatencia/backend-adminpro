const { response } = require("express");
const Usuario = require("../models/usuarios-model");
var bcrypt = require("bcryptjs");
const { generarJWT } = require("../helper/jwt");
const { googleVerify } = require("../helper/google-verify");
const { getMenuFrontEnd } = require("../helper/menu-frontend");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.json({
        ok: false,
        msg: "Email no valida",
      });
    }

    //   Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.json({
        ok: false,
        msg: "Contreaseña no valida",
      });
    }

    // generar token
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role)
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDB = await Usuario.findOne({ email });

    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    //guardar en bd
    await usuario.save();

    // generar token
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuario.role)
    });
    
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // generar token
  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.role)
  });
};

module.exports = { login, googleSignIn, renewToken };
