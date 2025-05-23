const express = require("express");
const router = express.Router();
const {
    cadastrarUsuario,
    loginUsuario,
    pegarPerfil
} = require("../controllers/usuarioController");
const verifytoken = require("../middleware/authMiddleware");

router.post("/usuarios", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", verifytoken, pegarPerfil);

module.exports = router;
