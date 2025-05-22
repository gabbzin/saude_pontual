const express = require('express');
const router = express.Router();
const { cadastrarUsuario, loginUsuario, verificarToken } = require('../controllers/usuarioController');

router.post('/usuarios', cadastrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ mensagem: 'Parametro id é obrigatório' });
  }
  try {
    const { rows } = await db.query(
      'SELECT id, nome, email FROM usuarios WHERE id = $1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    return res.json({ usuario: rows[0] });
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    return res.status(500).json({ mensagem: 'Erro interno ao buscar perfil' });
  }
});

module.exports = router;
