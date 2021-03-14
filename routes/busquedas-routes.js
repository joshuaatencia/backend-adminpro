const { Router } = require("express");
const { getTodo } = require("../controllers/busquedas-controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/:busqueda", validarJWT, getTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getTodo);

module.exports = router;
