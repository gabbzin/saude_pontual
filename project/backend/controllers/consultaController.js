const db = require("../db");

exports.criarConsulta = async (req, res) => {
    const { usuario_id, nome, idade, peso, altura, tipo_sanguineo,
            historico_de_saude, area_medica_desejada, data_agendamento, horario, motivo: motivo_da_consulta } = req.body;

    //campos "obrigatórios"
    if (!usuario_id || !nome || !idade || !peso || !altura || !tipo_sanguineo ||
    !historico_de_saude || !area_medica_desejada || !data_agendamento || !horario || !motivo_da_consulta) {
        return res
            .status(400)
            .json({ error: "Preencha todos os campos obrigatórios." });
        }
    
    
    const data_e_hora_combinada = `${data_agendamento} ${horario}`

    // verifica se ja tem consulta marcada no mesmo horário
    try {
        const { rows: exist } = await db.query(
            "SELECT id FROM consultas WHERE data_e_hora = $1",
            [data_e_hora_combinada]
        );

        if (exist.length > 0) {
            return res.status(409).json({ mensagem: "Horário já agendado" });
        }

        //insere consulta no banco
        const { rows } = await db.query(
            `INSERT INTO consultas (
                usuario_id,
                nome,
                idade,
                peso,
                altura,
                tipo_sanguineo,
                historico_de_saude,
                area_medica_desejada,
                data_e_hora
                motivo_da_consulta
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`,
            [
                usuario_id,
                nome,
                idade,
                peso,
                altura,
                tipo_sanguineo,
                historico_de_saude,
                area_medica_desejada,
                data_e_hora_combinada,
                motivo_da_consulta
            ]
        );

        // retorna a consulta criada
        return res.status(201).json({ consulta: rows[0] });
    } catch (err) {
        console.error("Erro ao criar consulta:", err);
        if (err.code === "23505") {
            return res.status(409).json({ mensagem: "Horário já agendado" });
        }
        return res
            .status(500)
            .json({ mensagem: "Erro interno ao criar consulta" });
    }
};
