const bcrypt = require('bcrypt');
const db = require('../db');

//função para criar um novo usuário
exports.cadastrarUsuario = async (req, res) => {
    const { nome, email, telefone, data_nascimento, senha } = req.body;
    

    // verefica se os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    }
    try {
        //criptografa a senha
        const senha_hash = await bcrypt.hash(senha, 10);

        //insere o novo usuário no banco de dados
        await db.query(
            'INSERT INTO usuarios (nome, email, telefone, data_nascimento, senha) VALUES ($1, $2, $3, $4, $5)',
            [nome, email, telefone, data_nascimento, senha_hash]
        );
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }
}
