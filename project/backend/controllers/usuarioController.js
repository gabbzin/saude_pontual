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
};

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    //verifica se os campos obrigatórios estão preenchidos
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    try {
        //busca o usuário no banco de dados, filtrando pelo email e coloca na variável usuario
        const { rows } = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = rows[0];

        //verifica se o usuário existe
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        //verifica se a senha está correta        
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        res.status(200).json({ mensagem: 'Login realizado com sucesso', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });


        // PARA FAZER DPS: Login com JWT
        // const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

