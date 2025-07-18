const { db } = require("../db");

exports.criarConsulta = async (req, res) => {
    const {
        nome,
        peso,
        altura,
        tipo_sanguineo,
        historico_de_saude,
        area_medica_desejada,
        data_e_hora,
        motivo,
    } = req.body;
    const usuario_id = req.userId;

    if (!area_medica_desejada || !data_e_hora) {
        return res
            .status(400)
            .json({ mensagem: "Área médica e data/hora são obrigatórios." });
    }

    try {
        // Lógica para encontrar profissional disponível (continua a mesma)
        const { rows: profissionaisDisponiveis } = await db.query(
            `
            SELECT p.id FROM profissionais p
            LEFT JOIN consultas c ON p.id = c.profissional_id AND c.data_e_hora = $2
            WHERE p.especialidade ILIKE $1 AND c.id IS NULL
            LIMIT 1;
            `,
            [`%${area_medica_desejada}%`, data_e_hora]
        );

        if (profissionaisDisponiveis.length === 0) {
            return res.status(409).json({
                mensagem:
                    "Nenhum profissional desta especialidade está disponível neste horário.",
            });
        }

        const profissionalId = profissionaisDisponiveis[0].id;

        // INSERÇÃO CORRIGIDA: sem o campo 'idade'
        const { rows } = await db.query(
            `INSERT INTO consultas (
                usuario_id, profissional_id, nome, peso, altura, tipo_sanguineo,
                historico_de_saude, area_medica_desejada, data_e_hora, motivo
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [
                usuario_id, // $1
                profissionalId, // $2
                nome, // $3
                peso, // $4
                altura, // $5
                tipo_sanguineo, // $6
                historico_de_saude, // $7
                area_medica_desejada, // $8
                data_e_hora, // $9
                motivo, // $10
            ]
        );

        return res.status(201).json({
            mensagem: "Consulta agendada com sucesso!",
            consulta: rows[0],
        });
    } catch (err) {
        console.error("Erro CRÍTICO ao criar consulta:", err);
        return res
            .status(500)
            .json({
                mensagem: "Erro interno no servidor ao agendar consulta.",
            });
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
                c.id,
                c.nome,
                c.area_medica_desejada,
                TO_CHAR(c.data_e_hora, 'YYYY-MM-DD') AS data_para_calendario,
                TO_CHAR(c.data_e_hora, 'DD/MM/YYYY') AS data_para_exibicao,
                TO_CHAR(c.data_e_hora, 'HH24:MI') AS hora_para_exibicao,
                c.profissional_id,
                p.nome AS profissional_nome,
                p.especialidade AS profissional_especialidade
            FROM
                consultas c
            LEFT JOIN profissionais p ON c.profissional_id = p.id
            WHERE
                c.usuario_id = $1
            ORDER BY
                c.data_e_hora DESC;`,
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

exports.buscarProfissionalPorArea = async (req, res) => {
    const { area_medica_desejada } = req.query;

    if (!area_medica_desejada) {
        return res.status(400).json({
            mensagem: "Área médica desejada é obrigatória.",
        });
    }

    try {
        const { rows } = await db.query(
            "SELECT id, nome, email, especialidade FROM profissionais WHERE especialidade ILIKE $1",
            [`%${area_medica_desejada}%`]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: "Nenhum profissional encontrado para a consulta.",
            });
        }

        return res.status(200).json({ profissionais: rows });
    } catch (err) {
        console.error("Erro ao buscar o profissional por area:", err);
        return res.status(500).json({
            mensagem: "Erro interno ao buscar o profissional",
        });
    }
};

exports.buscarConsultas = async (req, res) => {
    const profissional_id = req.userId;

    const query = `
            SELECT
                c.id, c.descricao AS relatorio, p.nome AS paciente_nome,
                DATE_FORMAT(c.data_consulta, '%d/%m/%Y') AS data_consulta,
                c.hora_consulta AS hora_consulta,
            FROM tb_consulta AS c
            JOIN tb_paciente AS p ON c.id_paciente = p.id
            WHERE c.id_profissional = ? ORDER BY c.data_consulta DESC, c.hora_consulta ASC`;

    db.query(query, [profissional_id], (err, data) => {
        if (err)
            return res
                .status(500)
                .json({ mensagem: "Erro ao buscar consultas." });

        return res.status(200).json({ consultas: data });
    });
};

exports.atualizarRelatorioConsulta = async (req, res) => {
    const idConsulta = req.params.id;
    const { relatorio } = req.body;
    const query = "UPDATE consultas SET relatorio = $1 where ID = $2";

    db.query(query, [relatorio, idConsulta], (err, data) => {
        if (err) {
            console.error("Erro ao atualizar relatório da consulta:", err);
            return res
                .status(500)
                .json({ mensagem: "Erro ao atualizar relatório." });
        }

        if (data.affectedRows === 0) {
            return res
                .status(404)
                .json({ mensagem: "Consulta não encontrada." });
        }

        return res
            .status(200)
            .json({ mensagem: "Relatório atualizado com sucesso." });
    });
};

// Listar consultas do profissional
exports.listarConsultasProfissional = async (req, res) => {
    const profissionalId = req.userId;
    if (!profissionalId) {
        return res.status(401).json({
            mensagem: "Token inválido ou ausente.",
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
            mensagem:
                "Erro interno ao buscar histórico de consultas do profissional",
        });
    }
};

// Endpoint único para listar consultas de usuário ou profissional
exports.listarConsultas = async (req, res) => {
    const userId = req.userId;
    const userRole = req.userRole; // role extraído do token pelo middleware

    if (!userId) {
        return res.status(401).json({ mensagem: "Acesso não autorizado." });
    }

    try {
        let query, params;
        if (userRole === "profissional") {
            query = `
                SELECT
                    c.id, c.nome, c.area_medica_desejada, c.data_e_hora,
                    c.relatorio, c.usuario_id,
                    u.nome AS usuario_nome
                FROM consultas c
                LEFT JOIN usuarios u ON c.usuario_id = u.id
                WHERE c.profissional_id = $1
                ORDER BY c.data_e_hora DESC
            `;
            params = [userId];
        } else {
            query = `
                SELECT
                    c.id, c.nome, c.area_medica_desejada, c.data_e_hora,
                    c.relatorio, c.profissional_id,
                    p.nome AS profissional_nome
                FROM consultas c
                LEFT JOIN profissionais p ON c.profissional_id = p.id
                WHERE c.usuario_id = $1
                ORDER BY c.data_e_hora DESC
            `;
            params = [userId];
        }

        const { rows } = await db.query(query, params);

        // Adiciona campos de data formatada para o calendário
        const consultas = rows.map((consulta) => ({
            ...consulta,
            data_para_calendario: consulta.data_e_hora
                ? consulta.data_e_hora.toISOString().split("T")[0]
                : null,
            data_para_exibicao: consulta.data_e_hora
                ? new Date(consulta.data_e_hora).toLocaleDateString("pt-BR")
                : null,
            hora_para_exibicao: consulta.data_e_hora
                ? new Date(consulta.data_e_hora).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                  })
                : null,
        }));

        return res.status(200).json({ consultas });
    } catch (err) {
        console.error("Erro ao listar consultas:", err);
        return res
            .status(500)
            .json({ mensagem: "Erro interno ao buscar consultas" });
    }
};

// Cancelar consulta (usuário)
exports.cancelarConsulta = async (req, res) => {
    const usuario_id = req.userId; // Vem do middleware
    const consultaId = req.params.id;

    try {
        // Busca a consulta e verifica se pertence ao usuário
        const { rows } = await db.query(
            `SELECT id, data_e_hora FROM consultas WHERE id = $1 AND usuario_id = $2`,
            [consultaId, usuario_id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: "Consulta não encontrada para este usuário.",
            });
        }
        const consulta = rows[0];
        const dataConsulta = new Date(consulta.data_e_hora);
        const agora = new Date();
        const diffMs = dataConsulta - agora;
        const diffHoras = diffMs / (1000 * 60 * 60);
        if (diffHoras < 12) {
            return res.status(400).json({
                mensagem:
                    "Só é possível cancelar consultas com pelo menos 12 horas de antecedência.",
            });
        }
        // Cancela (deleta) a consulta
        await db.query(`DELETE FROM consultas WHERE id = $1`, [consultaId]);
        return res.status(200).json({
            id: Number(consultaId)
        });
    } catch (err) {
        console.error("Erro ao cancelar consulta:", err);
        return res.status(500).json({
            mensagem: "Erro interno ao cancelar consulta.",
        });
    }
};

exports.buscarConsultaPorId = async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        // Query que busca a consulta e já junta os nomes do paciente e do profissional
        const { rows } = await db.query(
            `SELECT 
                c.*, 
                u.nome AS paciente_nome,
                u.data_nascimento,
                u.alergias_conhecidas,
                u.remedio_continuo,
                p.nome AS profissional_nome 
            FROM 
                consultas c
            LEFT JOIN 
                usuarios u ON c.usuario_id = u.id
            LEFT JOIN 
                profissionais p ON c.profissional_id = p.id
            WHERE 
                c.id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada." });
        }

        return res.status(200).json({ consulta: rows[0] });

    } catch (err) {
        console.error("Erro ao buscar detalhes da consulta:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};