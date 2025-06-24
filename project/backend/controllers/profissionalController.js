const bcrypt = require("bcryptjs");
const { db } = require("../db");
const jwt = require("jsonwebtoken");
const { validarSenha } = require("../utils/validation");
const { capitalizeEachWord } = require("../utils/formatters");

require("dotenv").config();

const SECRET_KEY = process.env.JWT_CHAVE;

// Função para cadastrar um novo profissional
exports.cadastrarProfissional = async (req, res) => {
    const { nome, email, senha, especialidade, crm, telefone } = req.body;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha || !especialidade || !crm) {
        return res.status(400).json({
            mensagem:
                "Nome, email, senha, especialidade e CRM são obrigatórios.",
        });
    }

    const nomeFormatado = capitalizeEachWord(nome);

    // Validação da força da senha
    if (!validarSenha(senha)) {
        return res.status(400).json({
            mensagem:
                "Senha deve conter: 8+ caracteres, 1 letra maiúscula e 1 caractere especial.",
        });
    }

    try {
        // Criptografa a senha
        const senha_hash = await bcrypt.hash(senha, 10);

        // Insere o novo profissional no banco de dados
        const { rows } = await db.query(
            `INSERT INTO profissionais (nome, email, senha, especialidade, crm, telefone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nome, email, especialidade, crm, telefone`,
            [
                nomeFormatado,
                email,
                senha_hash,
                especialidade,
                crm,
                telefone || null,
            ]
        );
        const profissional = rows[0];

        // Retorna profissional criado
        return res.status(201).json({
            mensagem: "Profissional cadastrado com sucesso",
            profissional,
        });
    } catch (err) {
        console.error("Erro ao cadastrar profissional:", err);
        if (err.code === "23505") {
            // Código de erro para violação de unicidade
            if (err.constraint === "profissionais_email_key") {
                return res
                    .status(409)
                    .json({ mensagem: "Email já cadastrado." });
            }
            if (err.constraint === "profissionais_crm_key") {
                return res.status(409).json({ mensagem: "CRM já cadastrado." });
            }
        }
        return res
            .status(500)
            .json({ mensagem: "Erro interno ao cadastrar profissional." });
    }
};

// Função para fazer login do profissional
exports.loginProfissional = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Email e senha são obrigatórios." });
    }

    try {
        const { rows } = await db.query(
            "SELECT id, nome, email, senha, especialidade, crm, telefone FROM profissionais WHERE email = $1",
            [email]
        );
        const profissional = rows[0];

        if (!profissional) {
            return res
                .status(401)
                .json({ mensagem: "Email ou senha inválidos." });
        }

        const senhaValida = await bcrypt.compare(senha, profissional.senha);
        if (!senhaValida) {
            return res
                .status(401)
                .json({ mensagem: "Email ou senha inválidos." });
        }

        const { senha: _, ...prof } = profissional;

        const token = jwt.sign(
            {
                id: prof.id,
                email: prof.email,
                nome: prof.nome,
                role: "profissional",
            },
            SECRET_KEY,
            { expiresIn: "1h" } // Token para profissionais pode ter uma expiração diferente se necessário
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso",
            profissional: prof,
            token,
        });
    } catch (err) {
        console.error("Erro ao fazer login do profissional:", err);
        return res
            .status(500)
            .json({ mensagem: "Erro interno ao realizar login." });
    }
};

exports.deletarProfissional = async (req, res) => {
    const profissionalId = req.params.id;
    if (!profissionalId) {
        return res.status(400).json({
            mensagem: "ID do profissional é obrigatório.",
        });
    }

    try {
        const { rows } = await db.query(
            "DELETE FROM profissionais WHERE id = $1",
            [profissionalId]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: "Profissional não encontrado.",
            });
        }
        return res.status(200).json({
            mensagem: "Profissional deletado com sucesso.",
        });
    } catch (err) {
        console.error("Erro ao deletar profissional:", err);
        return res.status(500).json({
            mensagem: "Erro interno ao deletar profissional.",
        });
    }
};

exports.listarConsultasProfissional = async (req, res) => {
  const profissionalId = req.params.id;
  if (!profissionalId) {
    return res.status(400).json({
      mensagem: "ID do profissional é obrigatório.",
    });
  }
  try {
    const { rows } = await db.query(
      `SELECT
                c.id,
                c.nome,
                c.area_medica_desejada,
                TO_CHAR(c.data_e_hora, 'YYYY-MM-DD') AS data_para_calendario,
                TO_CHAR(c.data_e_hora, 'DD/MM/YYYY') AS data_para_exibicao,
                TO_CHAR(c.data_e_hora, 'HH24:MI') AS hora_para_exibicao,
                c.usuario_id,
                u.nome AS usuario_nome
            FROM
                consultas c
            LEFT JOIN usuarios u ON c.usuario_id = u.id
            WHERE
                c.profissional_id = $1
            ORDER BY
                c.data_e_hora DESC;`,
      [profissionalId]
    );
    return res.status(200).json({ consultas: rows });
  } catch (err) {
    console.error("Erro ao listar consultas do profissional:", err);
    return res.status(500).json({
      mensagem: "Erro interno ao buscar histórico de consultas do profissional",
    });
  }
};