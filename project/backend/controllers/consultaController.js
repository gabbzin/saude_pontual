const { db } = require("../db");

exports.criarConsulta = async (req, res) => {
    // data_e_hora é esperado como uma string combinada (ex: "YYYY-MM-DDTHH:mm")
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
    } = req.body; // Alterado de motivo: motivo_da_consulta para motivo

    const usuario_id = req.userId;

    if (!usuario_id) {
        return res.status(401).json({
            error: "Acesso não autorizado. Token inválido ou ausente.",
        });
    }

    //campos "obrigatórios"
    if (
        !nome ||
        !idade ||
        !peso ||
        !altura ||
        !tipo_sanguineo ||
        !historico_de_saude ||
        !area_medica_desejada ||
        !data_e_hora ||
        !motivo
    ) {
        return res
            .status(400)
            .json({ error: "Preencha todos os campos obrigatórios." });
    }

    // verifica se ja tem consulta m/rcada no mesmo horário
    try {
        const { rows: exist } = await db.query(
            "SELECT id FROM consultas WHERE data_e_hora = $1",
            [data_e_hora]
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
                data_e_hora,
                motivo
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
                data_e_hora,
                motivo,
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

exports.listarConsultasUsuario = async (req, res) => {
    const usuario_id = req.userId;

    if (!usuario_id) {
        return res.status(401).json({
            error: "Acesso não autorizado. Token inválido ou ausente.",
        });
    }

    try {
        const { rows } = await db.query(
            `SELECT
                id,
                nome,
                area_medica_desejada,
                TO_CHAR(data_e_hora, 'YYYY-MM-DD') AS data_para_calendario,  -- Formato YYYY-MM-DD para comparação no FullCalendar
                TO_CHAR(data_e_hora, 'DD/MM/YYYY') AS data_para_exibicao,    -- Formato DD/MM/YYYY para exibir no modal
                TO_CHAR(data_e_hora, 'HH24:MI') AS hora_para_exibicao       -- Formato HH:MI (24h) para exibir a hora separadamente
            FROM
                consultas
            WHERE
                usuario_id = $1
            ORDER BY
                data_e_hora DESC;`,
            [usuario_id]
        );
        return res.status(200).json({ consultas: rows });
    } catch (err) {
        console.error("Erro ao listar consultas do usuário:", err);
        return res.status(500).json({
            mensagem: "Erro interno ao buscar histórico de consultas",
        });
    }
};
