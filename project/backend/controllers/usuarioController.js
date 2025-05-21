const bcrypt = require('bcryptjs');
const db = require('../db');

const jwt = require('jsonwebtoken');

const gerarToken = (id) => jwt.sign({ id }, process.env.JWT_CHAVE, { expiresIn: '1h' });

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
        const result = await db.query(
            'INSERT INTO usuarios (nome, email, telefone, data_nascimento, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [nome, email, telefone || null, data_nascimento, senha_hash]
        );
        
        // busca o id do usuário recém-criado
        const userId = result.rows[0].id;
        // gera um token JWT para o usuário
        const token = gerarToken(userId);
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', token, usuario: { id: userId, nome, email } });

    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
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
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const token = gerarToken(usuario.id);
        res.status(200).json({ mensagem: 'Login realizado com sucesso', token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });

    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

// verificar JWT em rotas protegidas
exports.verificarToken = (req, res, next) => {
  
    // verifica se o token foi fornecido no header da requisição
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ mensagem: 'Token não fornecido' });

  // confere o formato do token pq o header costuma vir no formato "Bearer <token>"
    const [, token] = authHeader.split(' ');
    if (!token) return res.status(401).json({ mensagem: 'Token inválido' });

    try {
        const payload = jwt.verify(token, process.env.JWT_CHAVE);
        req.userId = payload.id;
        next();
    } catch (err){
        return res.status(401).json({ mensagem: 'Token expirado ou inválido' });
  }
};
