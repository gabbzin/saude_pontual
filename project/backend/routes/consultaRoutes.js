const express = require("express");
const router = express.Router();
const {
  criarConsulta,
  listarConsultas,
  buscarProfissionalPorArea,
  buscarConsultas,
  atualizarRelatorioConsulta,
  cancelarConsulta,
  buscarConsultaPorId
} = require("../controllers/consultaController");
const { verifyToken } = require("../middleware/authMiddleware");

// Rota para criar uma nova consulta (mantendo o endpoint /fichapessoa por compatibilidade com o frontend)
router.post("/fichapessoa", verifyToken, criarConsulta);
router.get("/consultas/:id", verifyToken, buscarConsultaPorId);
// Rota única para listar consultas do usuário ou profissional autenticado
router.get("/consultas", verifyToken, listarConsultas);

router.get("/historico", verifyToken, buscarConsultas);
router.put("/consultas/relatorio/:id", verifyToken, atualizarRelatorioConsulta);
router.delete("/consultas/cancelar/:id", verifyToken, cancelarConsulta);

router.get("/profissionais/buscar", buscarProfissionalPorArea);

module.exports = router;
