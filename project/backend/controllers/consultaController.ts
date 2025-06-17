import { Request, Response } from "express";
import { db } from "../db/db.ts";
import { consultas, profissionais } from "../db/schema/schema.ts";
import { eq, ilike, desc } from "drizzle-orm";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const criarConsulta = async (req: AuthenticatedRequest, res: Response) => {
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

  if (!usuario_id) {
    return res.status(401).json({ message: "Acesso não autorizado. Token inválido ou ausente." });
  }

  try {
    const consultasExistentes = await db
      .select()
      .from(consultas)
      .where(eq(consultas.data_e_hora, data_e_hora));

    if (consultasExistentes.length > 0) {
      return res.status(409).json({ message: "Horário já agendado" });
    }

    const [consulta] = await db
      .insert(consultas)
      .values({
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
      })
      .returning({
        id: consultas.id,
        nome: consultas.nome,
        data_e_hora: consultas.data_e_hora,
      });

    return res.status(201).json({ consulta, message: "Consulta criada com sucesso" });
  } catch (err: any) {
    console.error("Erro ao criar consulta:", err);
    if (err.code === "23505") {
      return res.status(409).json({ message: "Horário já agendado" });
    }
    return res.status(500).json({ message: "Erro interno ao criar consulta" });
  }
};

export const listarConsultasUsuario = async (req: AuthenticatedRequest, res: Response) => {
  const usuario_id = req.userId;

  if (!usuario_id) {
    return res.status(401).json({ message: "Acesso não autorizado. Token inválido ou ausente." });
  }

  try {
    const consultasList = await db
      .select()
      .from(consultas)
      .where(eq(consultas.usuario_id, usuario_id))
      .orderBy(desc(consultas.data_e_hora));

    return res.status(200).json({ consultas: consultasList });
  } catch (err: any) {
    console.error("Erro ao listar consultas do usuário:", err);
    return res.status(500).json({ message: "Erro interno ao buscar histórico de consultas" });
  }
};

export const buscarProfissionalPorArea = async (req: Request, res: Response) => {
  const area = typeof req.query.area_medica_desejada === "string"
    ? req.query.area_medica_desejada
    : null;

  if (!area) {
    return res.status(400).json({ message: "Área médica desejada é obrigatória." });
  }

  try {
    const profissionaisList = await db
      .select()
      .from(profissionais)
      .where(ilike(profissionais.especialidade, `%${area}%`));

    if (profissionaisList.length === 0) {
      return res.status(404).json({ message: "Nenhum profissional encontrado para a consulta." });
    }

    return res.status(200).json({ profissionais: profissionaisList });
  } catch (err: any) {
    console.error("Erro ao buscar profissional por área:", err);
    return res.status(500).json({ message: "Erro interno ao buscar o profissional" });
  }
};
