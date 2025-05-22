const bcrypt = require('bcryptjs');
const db = require('../db');

//função para criar um novo usuário
exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, telefone, data_nascimento, senha } = req.body;

  //verifica se os campos obrigatórios estão preenchidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
  }
  try {
    //criptografa a senha
    const senha_hash = await bcrypt.hash(senha, 10);

    //insere o novo usuário no banco de dados
    const { rows } = await db.query(
      `INSERT INTO usuarios (nome, email, telefone, data_nascimento, senha)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nome, email`,
      [nome, email, telefone || null, data_nascimento || null, senha_hash]
    );
    const usuario = rows[0];

    //retorna usuário criado
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    if (err.code === '23505') {
      return res.status(409).json({ mensagem: 'Email já cadastrado' });
    }
    return res.status(500).json({ mensagem: 'Erro interno ao cadastrar usuário' });
  }
};

//função para fazer login
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  //verifica se os campos obrigatórios estão preenchidos
  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
  }
  try {
    //busca usuário no banco de dados filtrando pelo email
    const { rows } = await db.query(
      'SELECT id, nome, email, senha FROM usuarios WHERE email = $1',
      [email]
    );
    const usuario = rows[0];

    //verifica se o usuário existe
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    //verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    //remove senha antes de retornar
    const { senha: _, ...user } = usuario;

    //retorna dados do usuário autenticado
    return res.status(200).json({ mensagem: 'Login realizado com sucesso', usuario: user });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ mensagem: 'Erro interno ao realizar login' });
  }
};
