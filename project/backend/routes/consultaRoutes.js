const express = require("express");
const router = express.Router();
const { criarConsulta } = require("../controllers/consultaController");
const { verifyToken } = require("../middleware/authMiddleware");

// Rota para criar uma nova consulta (mantendo o endpoint /fichapessoa por compatibilidade com o frontend)
router.post("/fichapessoa", verifyToken, criarConsulta);

module.exports = router;