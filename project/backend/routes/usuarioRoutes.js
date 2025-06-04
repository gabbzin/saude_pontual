const express = require("express");
const router = express.Router();
const {
    cadastrarUsuario,
    loginUsuario,
    pegarPerfil,
    adicionarInfoPerfil
} = require("../controllers/usuarioController");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/usuarios", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", verifyToken, pegarPerfil);
router.put("/perfil/info", verifyToken, adicionarInfoPerfil);

module.exports = router;
