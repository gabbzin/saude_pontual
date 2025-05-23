const express = require("express");
const router = express.Router();
const {
    cadastrarUsuario,
    loginUsuario,
    pegarPerfil
} = require("../controllers/usuarioController");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/usuarios", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", verifyToken, pegarPerfil);

module.exports = router;
