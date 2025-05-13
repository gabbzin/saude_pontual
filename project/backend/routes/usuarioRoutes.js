const express = require('express');
const router = express.Router();
const { cadastrarUsuario, loginUsuario, verificarToken } = require('../controllers/usuarioController');

router.post('/usuarios', cadastrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const { rows } = await require('../db').query('SELECT id, nome, email FROM usuarios WHERE id = $1', [req.userId]);
    res.json({ usuario: rows[0] });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar perfil' });
  }
});

module.exports = router;
