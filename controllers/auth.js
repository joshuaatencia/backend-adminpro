const { response } = require("express");
const Usuario = require("../models/usuarios-model");
var bcrypt = require("bcryptjs");
const { generarJWT } = require("../helper/jwt");
const { googleVerify } = require("../helper/google-verify");

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
        password: '@@@',
        img:picture,
        google: true
      });
    }else{
      usuario = usuarioDB;
      usuario.google = true;
    }

    //guardar en bd
    await usuario.save();

    // generar token
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

module.exports = { login, googleSignIn };
