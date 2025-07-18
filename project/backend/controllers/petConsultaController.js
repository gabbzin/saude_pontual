const { db } = require("../db");

exports.criarConsultaPet = async (req, res) => {
    const {
        nome_pet,
        especie,
        raca,
        sexo,
        esterilizacao,
        cor,
        peso_pet,
        identificacao_pet, 
        historico_saude_pet,
        motivo_consulta_pet,
        data_e_hora, 
    } = req.body;

    const usuario_id = req.userId; 

    // 1. Validação de autenticação
    if (!usuario_id) {
        return res.status(401).json({ error: "Acesso não autorizado. Token inválido ou ausente." });
    }

    // 2. Validação de campos obrigatórios
    if (!nome_pet || !especie || !motivo_consulta_pet || !data_e_hora) {
        return res.status(400).json({ error: "Campos obrigatórios: 'nome_pet', 'especie', 'motivo_consulta_pet' e 'data_e_hora' são necessários." });
    }

    if (isNaN(new Date(data_e_hora).getTime())) {
        return res.status(400).json({ error: "Formato de 'data_e_hora' inválido." });
    }

    try {
        // 4. Checar disponibilidade de horário para consultas humanas E pets
        const dataHoraObj = new Date(data_e_hora); 

        const { rows: consultasExistentes } = await db.query(
            `SELECT id FROM consultas WHERE data_e_hora = $1
             UNION ALL
             SELECT id FROM consultas_pet WHERE data_e_hora = $1`,
            [dataHoraObj]
        );

        if (consultasExistentes.length > 0) {
            return res.status(409).json({ mensagem: "Horário já agendado para uma consulta (humana ou pet). Por favor, escolha outro horário." });
        }

        // 5. Inserir nova consulta de pet
        const { rows: newConsultaPet } = await db.query(
            `INSERT INTO consultas_pet (
                usuario_id, nome_pet, especie, raca, sexo, esterilizacao, cor,
                peso_pet, identificacao_pet, historico_saude_pet,
                motivo_consulta_pet, data_e_hora
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [
                usuario_id,
                nome_pet,
                especie,
                raca || null,
                sexo || null,
                esterilizacao || null,
                cor || null,
                peso_pet || null,
                identificacao_pet || null,
                historico_saude_pet || null,
                motivo_consulta_pet,
                dataHoraObj,
            ]
        );

        return res.status(201).json({
            consultaPet: newConsultaPet[0],
            mensagem: "Consulta para pet cadastrada com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao criar consulta para pet:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor ao criar consulta para pet." });
    }
};

exports.listarConsultasPetUsuario = async (req, res) => {
    const usuario_id = req.userId;

    if (!usuario_id) {
        return res.status(401).json({ error: "Acesso não autorizado. Token inválido ou ausente." });
    }

    try {
        const { rows: consultas } = await db.query(
            `SELECT
                id,
                nome_pet,
                especie,
                raca,
                sexo,
                esterilizacao,
                cor,
                peso_pet,
                identificacao_pet,
                historico_saude_pet,
                motivo_consulta_pet,
                data_e_hora,
                TO_CHAR(data_e_hora, 'YYYY-MM-DD') AS data_para_calendario,
                TO_CHAR(data_e_hora, 'DD/MM/YYYY') AS data_para_exibicao,
                TO_CHAR(data_e_hora, 'HH24:MI') AS hora_para_exibicao
             FROM consultas_pet
             WHERE usuario_id = $1
             ORDER BY data_e_hora DESC`,
            [usuario_id]
        );
        return res.status(200).json({ consultas });
    } catch (error) {
        console.error("Erro ao listar consultas de pet para o usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor ao buscar histórico de consultas de pet." });
    }
};

exports.listarTodasConsultasPet = async (req, res) => {
    const profissionalId = req.profissionalId || req.userId;
    if (!profissionalId) {
        return res.status(401).json({ error: "Acesso não autorizado. Credenciais de profissional/administrador ausentes." });
    }
    try {
        const { rows: consultasGerais } = await db.query(
            `SELECT
                cp.id,
                cp.usuario_id,
                cp.nome_pet,
                cp.especie,
                cp.raca,
                cp.sexo,
                cp.esterilizacao,
                cp.cor,
                cp.peso_pet,
                cp.identificacao_pet,
                cp.historico_saude_pet,
                cp.motivo_consulta_pet,
                cp.data_e_hora,
                TO_CHAR(cp.data_e_hora, 'YYYY-MM-DD') AS data_para_calendario,
                TO_CHAR(cp.data_e_hora, 'DD/MM/YYYY') AS data_para_exibicao,
                TO_CHAR(cp.data_e_hora, 'HH24:MI') AS hora_para_exibicao,
                u.nome AS nome_usuario,
                u.email AS email_usuario
            FROM
                consultas_pet cp
            LEFT JOIN
                usuarios u ON cp.usuario_id = u.id
            ORDER BY
                cp.data_e_hora DESC;`,
        );
        return res.status(200).json({ consultas: consultasGerais });
    } catch (error) {
        console.error("Erro ao listar todas as consultas de pet:", error);
        return res.status(500).json({ error: "Erro interno do servidor ao buscar todas as consultas de pet." });
    }
};

// Deletar consulta de pet
exports.deletarConsultaPet = async (req, res) => {
    const usuario_id = req.userId;
    const consultaId = req.params.id;

    if (!usuario_id) {
        return res.status(401).json({ error: "Acesso não autorizado. Token inválido ou ausente." });
    }
    if (!consultaId) {
        return res.status(400).json({ error: "ID da consulta é obrigatório." });
    }
    try {
        // Só permite deletar se a consulta for do usuário
        const { rowCount } = await db.query(
            `DELETE FROM consultas_pet WHERE id = $1 AND usuario_id = $2`,
            [consultaId, usuario_id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ error: "Consulta de pet não encontrada ou não pertence ao usuário." });
        }
        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar consulta de pet:", error);
        return res.status(500).json({ error: "Erro interno ao deletar consulta de pet." });
    }
};