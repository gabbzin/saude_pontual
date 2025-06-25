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

    // verifica se já tem consulta marcada no mesmo horário para o profissional
    try {
        // Buscar profissional disponível para a especialidade e horário
        const { rows: profissionais } = await db.query(
            `SELECT id FROM profissionais WHERE especialidade ILIKE $1`,
            [`%${area_medica_desejada}%`]
        );
        if (profissionais.length === 0) {
            return res.status(404).json({
                mensagem:
                    "Nenhum profissional disponível para essa especialidade.",
            });
        }

        // Verifica disponibilidade de cada profissional
        let profissionalDisponivel = null;
        for (const prof of profissionais) {
            const { rows: consultasProf } = await db.query(
                `SELECT id FROM consultas WHERE profissional_id = $1 AND data_e_hora = $2`,
                [prof.id, data_e_hora]
            );
            if (consultasProf.length === 0) {
                profissionalDisponivel = prof.id;
                break;
            }
        }
        if (!profissionalDisponivel) {
            return res
                .status(409)
                .json({
                    mensagem: "Nenhum profissional disponível nesse horário.",
                });
        }

        // Validação de horário: só permite agendamento entre 08:00 e 18:00 (exemplo)
        const hora = new Date(data_e_hora).getHours();
        if (hora < 8 || hora > 18) {
            return res.status(400).json({
                mensagem: "Horário fora do expediente (08:00-18:00).",
            });
        }

        // Insere consulta no banco
        const { rows } = await db.query(
            `INSERT INTO consultas (
                usuario_id,
                profissional_id,
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
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`,
            [
                usuario_id,
                profissionalDisponivel,
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
        if (err) return res.status(500).json({mensagem: "Erro ao buscar consultas."});

        return res.status(200).json({consultas: data})
    });
};

exports.atualizarRelatorioConsulta = async (req, res) => {
    const idConsulta = req.params.id;
    const { relatorio } = req.body;
    const query = "UPDATE tb_consulta SET `descricao` = ? where ID = ?";

    db.query(query, [relatorio, idConsulta], (err, data) => {
        if (err) {
            console.error("Erro ao atualizar relatório da consulta:", err);
            return res.status(500).json({ mensagem: "Erro ao atualizar relatório." });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Consulta não encontrada." });
        }

        return res.status(200).json({ mensagem: "Relatório atualizado com sucesso." });
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
            mensagem: "Erro interno ao buscar histórico de consultas do profissional",
        });
    }
};