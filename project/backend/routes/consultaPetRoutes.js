// const express = require('express');
// const router = express.Router();
// const petConsultaController = require('../controllers/petConsultaController');
// const { verificarToken } = require('../middleware/authMiddleware'); // Exemplo de middleware de autenticação

// // Rota para criar consulta de pet (protegida)
// router.post('/consultas-pet', verificarToken, petConsultaController.criarConsultaPet);

// // Rota para listar consultas de pet do usuário (protegida)
// router.get('/consultas-pet/me', verificarToken, petConsultaController.listarConsultasPetUsuario);

// // Rota para listar todas as consultas de pet (para admin/profissional, ajuste o middleware conforme necessário)
// router.get('/consultas-pet/all', verificarToken, petConsultaController.listarTodasConsultasPet); // ou um middleware mais específico para admin/profissional

// module.exports = router;