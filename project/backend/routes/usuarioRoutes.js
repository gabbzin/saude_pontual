const express = require("express");
const router = express.Router();
const {
    cadastrarUsuario,
    loginUsuario,
    pegarPerfil,
    adicionarInfoPerfil,
    listarTodosUsuarios
} = require("../controllers/usuarioController");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/usuarios", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", verifyToken, pegarPerfilDoToken);
router.put("/perfil/info", verifyToken, adicionarInfoPerfil);
router.get("/usuarios", listarTodosUsuarios);

module.exports = router;
