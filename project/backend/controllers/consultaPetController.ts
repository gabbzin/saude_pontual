import { Request, Response } from "express";
import { db } from "../db/db.ts";
import { consultas_pet as consulta_pet } from "../db/schema/schema.ts";
import { eq } from "drizzle-orm";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const criarConsultaPet = async (req: AuthenticatedRequest, res: Response) => {
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
    return res
      .status(401)
      .json({ error: "Acesso não autorizado. Token inválido ou ausente." });
  }

  if (!nome_pet || !especie || !motivo_consulta_pet || !data_e_hora) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não informados." });
  }

  try {
    const [consulta] = await db
      .insert(consulta_pet)
      .values({
        usuario_id,
        nome_pet,
        especie,
        raca: raca || null,
        sexo: sexo || null,
        esterilizacao: esterilizacao || null,
        cor: cor || null,
        peso_pet: peso_pet || null,
        identificacao_pet: identificacao_pet || null,
        historico_saude_pet: historico_saude_pet || null,
        motivo_consulta_pet,
        data_e_hora, // certifique-se de que esse valor esteja no formato aceito pelo Drizzle e pelo PostgreSQL
      })
      .returning({
        id: consulta_pet.id,
        nome_pet: consulta_pet.nome_pet,
        data_e_hora: consulta_pet.data_e_hora,
      });

    return res
      .status(201)
      .json({ consultaPet: consulta, mensagem: "Consulta para pet cadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar consulta para pet:", error);
    return res
      .status(500)
      .json({ mensagem: "Erro interno ao criar consulta para pet." });
  }
};

export const listarConsultasPetUsuario = async (req: AuthenticatedRequest, res: Response) => {
  const usuario_id = req.userId;
  if (!usuario_id) {
    return res
      .status(401)
      .json({ error: "Acesso não autorizado. Token inválido ou ausente." });
  }

  try {
    const consultas = await db
      .select()
      .from(consulta_pet)
      .where(eq(consulta_pet.usuario_id, usuario_id));
    return res.status(200).json({ consultas });
  } catch (error) {
    console.error("Erro ao listar consultas para pet:", error);
    return res
      .status(500)
      .json({ mensagem: "Erro interno ao listar consultas para pet." });
  }
};