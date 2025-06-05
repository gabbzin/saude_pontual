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

    if (!usuario_id) {
        return res.status(401).json({ error: "Acesso não autorizado. Token inválido ou ausente." });
    }

    // Campos obrigatórios básicos
    if (!nome_pet || !especie || !motivo_consulta_pet || !data_e_hora) {
        return res.status(400).json({ error: "Campos obrigatórios (nome do pet, espécie, motivo da consulta, data e hora) não preenchidos." });
    }

    try {
        const { rows: consultasHumanas } = await db.query(
            "SELECT id FROM consultas WHERE data_e_hora = $1",
            [data_e_hora]
        );
        const { rows: consultasPets } = await db.query(
            "SELECT id FROM consultas_pet WHERE data_e_hora = $1",
            [data_e_hora]
        );

        if (consultasHumanas.length > 0 || consultasPets.length > 0) {
            return res.status(409).json({ mensagem: "Horário já agendado para uma consulta (humana ou pet)." });
        }

        const { rows } = await db.query(
            `INSERT INTO consultas_pet (
                usuario_id, nome_pet, especie, raca, sexo, esterilizacao, cor,
                peso_pet, identificacao_pet, historico_saude_pet,
                motivo_consulta_pet, data_e_hora
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [
                usuario_id, nome_pet, especie, raca || null, sexo || null, esterilizacao || null, cor || null,
                peso_pet || null, identificacao_pet || null, historico_saude_pet || null,
                motivo_consulta_pet, data_e_hora,
            ]
        );

        return res.status(201).json({ consultaPet: rows[0], mensagem: "Consulta para pet cadastrada com sucesso!" });
    } catch (err) {
        console.error("Erro ao criar consulta para pet:", err);
        return res.status(500).json({ mensagem: "Erro interno ao criar consulta para pet." });
    }
};
