const db = require('../db');

exports.criarConsulta = async (req, res) => {
  const { usuario_id, data_horario, motivo } = req.body;

  //campos "obrigatórios"
  if (!usuario_id || !data_horario || !motivo) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }
  //verifica se ja tem consulta marcada no mesmo horário
  try {
    const { rows: exist } = await db.query(
      'SELECT id FROM consultas WHERE data_horario = $1',
      [data_horario]
    );
    if (exist.length > 0) {
      return res.status(409).json({ mensagem: 'Horário já agendado' });
    }

    //insere consulta no banco
    const { rows } = await db.query(
      `INSERT INTO consultas (usuario_id, data_horario, motivo)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [usuario_id, data_horario, motivo]
    );

    // retorna a consulta criada
    return res.status(201).json({ consulta: rows[0] });
    } catch (err) {
    console.error('Erro ao criar consulta:', err);
    if (err.code === '23505') {
      return res.status(409).json({ mensagem: 'Horário já agendado' });
    }
    return res.status(500).json({ mensagem: 'Erro interno ao criar consulta' });
    }
};