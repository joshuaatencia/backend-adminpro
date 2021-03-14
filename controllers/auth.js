const { response } = require("express");
const Usuario = require("../models/usuarios-model");
var bcrypt = require("bcryptjs");
const { generarJWT } = require("../helper/jwt");

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
        ok:true,
        token
    });

  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
