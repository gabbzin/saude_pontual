const express = require("express");
const router = express.Router();
const {
    cadastrarUsuario,
    loginUsuario,
    pegarPerfil,
    cadastrarConsulta,
    adicionarInfoPerfil
} = require("../controllers/usuarioController");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/usuarios", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", verifyToken, pegarPerfil);
router.post("/fichapessoa", verifyToken, cadastrarConsulta);
router.put("/perfil/info", verifyToken, adicionarInfoPerfil);

module.exports = router;
