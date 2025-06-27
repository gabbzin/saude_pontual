const express = require('express');
const router = express.Router();
const petConsultaController = require('../controllers/petConsultaController');
const { verifyToken } = require('../middleware/authMiddleware');

// Rota para criar consulta de pet (protegida)
router.post('/pet/fichapet', verifyToken, petConsultaController.criarConsultaPet);

// Rota para listar consultas de pet do usuário (protegida)
router.get('/pet/consultas', verifyToken, petConsultaController.listarConsultasPetUsuario);

// Rota para deletar consulta de pet do usuário (protegida)
router.delete('/pet/consultas/:id', verifyToken, petConsultaController.deletarConsultaPet);

module.exports = router;