const bcrypt = require("bcryptjs");
const {db} = require("../db");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // Carregando as variáveis de ambiente

const SECRET_KEY = process.env.JWT_CHAVE;
//função para criar um novo usuário
exports.cadastrarUsuario = async (req, res) => {
    const { nome, email, telefone, data_nascimento, senha } = req.body;

    //verifica se os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Nome, email e senha são obrigatórios" });
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
        return res
            .status(201)
            .json({ mensagem: "Usuário cadastrado com sucesso", usuario });
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        if (err.code === "23505") {
            return res.status(409).json({ mensagem: "Email já cadastrado" });
        }
        return res
            .status(500)
            .json({ mensagem: "Erro interno ao cadastrar usuário" });
    }
};

//função para fazer login
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    //verifica se os campos obrigatórios estão preenchidos
    if (!email || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Email e senha são obrigatórios" });
    }
    try {
        //busca usuário no banco de dados filtrando pelo email
        const { rows } = await db.query(
            "SELECT id, nome, email, senha FROM usuarios WHERE email = $1",
            [email]
        );
        const usuario = rows[0];

        //verifica se o usuário existe
        if (!usuario) {
            return res
                .status(401)
                .json({ mensagem: "Email ou senha inválidos" });
        }

        //verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res
                .status(401)
                .json({ mensagem: "Email ou senha inválidos" });
        }

        // remove senha antes de retornar
        const { senha: _, ...user } = usuario;

        // Adiciona token antes de retornar
        const token = jwt.sign(
            {id: user.id, email: user.email, nome: user.nome}, SECRET_KEY, {expiresIn: "20min"}
        )


        // retorna dados do usuário autenticado
        return res
            .status(200)
            .json({ mensagem: "Login realizado com sucesso", usuario: user, token });
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        return res
            .status(500)
            .json({ mensagem: "Erro interno ao realizar login" });
    }
};

exports.pegarPerfil = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ mensagem: "Parametro id é obrigatório" });
    }
    try {
        const { rows } = await db.query(
            "SELECT id, nome, email FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        return res.json({ usuario: rows[0] });
    } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        return res.status(500).json({ mensagem: "Erro interno ao buscar perfil" });
    }
};

exports.cadastrarConsulta = async (req, res) => {
    const {
        nome,
        idade,
        peso,
        altura,
        tipo_sanguineo,
        historico_de_saude,
        area_medica_desejada,
        data_e_hora,
        motivo,
    } = req.body;

    const usuario_id = req.userId;

    try {
        await db.query (
            `INSERT INTO consultas 
            (usuario_id, nome, idade, peso, altura, tipo_sanguineo, historico_de_saude, area_medica_desejada, data_e_hora, motivo) 
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
                usuario_id,
                nome,
                idade,
                peso,
                altura,
                tipo_sanguineo,
                historico_de_saude,
                area_medica_desejada,
                data_e_hora,
                motivo,
            ]
        );
        res.status(201).json({mensagem: "Consulta cadastrada com sucesso!"});
    } catch (error) {
        console.error("Erro ao cadastrar consulta: ", error);
        res.status(500).json({mensagem: "Erro ao cadastrar esta consulta"})
    }
}