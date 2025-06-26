const express = require("express");
const router = express.Router();
const {
  criarConsulta,
  listarConsultas,
  buscarProfissionalPorArea,
  buscarConsultas,
  atualizarRelatorioConsulta,
} = require("../controllers/consultaController");
const { verifyToken } = require("../middleware/authMiddleware");

// Rota para criar uma nova consulta (mantendo o endpoint /fichapessoa por compatibilidade com o frontend)
router.post("/fichapessoa", verifyToken, criarConsulta);

// Rota única para listar consultas do usuário ou profissional autenticado
router.get("/consultas", verifyToken, listarConsultas);

router.get("/historico", verifyToken, buscarConsultas);
router.put("/consultas/relatorio/:id", verifyToken, atualizarRelatorioConsulta);

router.get("/profissionais/buscar", buscarProfissionalPorArea);

module.exports = router;
