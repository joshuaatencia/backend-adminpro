const { response } = require("express");
const Usuario = require("../models/usuarios-model");
const Medico = require("../models/medicos-model");
const Hospitales = require("../models/hospitales-model");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [medicos, usuarios, hospitales] = await Promise.all([
    Medico.find({ nombre: regex }),
    Usuario.find({ nombre: regex }),
    Hospitales.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case medicos:
      data = await Medico.find({ nombre: regex })
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')
      break;
    case hospitales:
      data = await Hospitales.find({ nombre: regex })
      .populate('usuario', 'nombre img');
      break;
    case usuarios:
      data = await Usuario.find({ nombre: regex });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });
  }

  res.json({
    ok: true,
    resultados: data
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
