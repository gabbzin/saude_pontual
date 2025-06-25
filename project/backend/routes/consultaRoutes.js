const express = require("express");
const router = express.Router();
const {
  criarConsulta,
  listarConsultasUsuario,
  buscarProfissionalPorArea,
  buscarConsultas,
  atualizarRelatorioConsulta,
} = require("../controllers/consultaController");
const { verifyToken } = require("../middleware/authMiddleware");

// Rota para criar uma nova consulta (mantendo o endpoint /fichapessoa por compatibilidade com o frontend)
router.post("/fichapessoa", verifyToken, criarConsulta);

// Rota para listar o histórico de consultas do usuário logado
router.get("/consultas/historico", verifyToken, listarConsultasUsuario);

router.get("/historico", verifyToken, buscarConsultas);
router.put("/relatorio", verifyToken, atualizarRelatorioConsulta);

router.get("/profissionais/buscar", buscarProfissionalPorArea);

module.exports = router;
