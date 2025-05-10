const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/api/usuarios', usuarioController.cadastrarUsuario);
router.post('/api/login', usuarioController.loginUsuario);

module.exports = router;
