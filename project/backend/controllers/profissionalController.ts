import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/db.ts";
import { profissionais } from "../db/schema/schema.ts";
import { eq } from "drizzle-orm";

const SECRET_KEY = process.env.JWT_CHAVE;
if (!SECRET_KEY) {
  throw new Error("JWT_CHAVE não definida no .env");
}

export const cadastrarProfissional = async (req: Request, res: Response) => {
  const { nome, email, senha, especialidade, crm } = req.body;

  if (!nome || !email || !senha || !especialidade || !crm) {
    return res.status(400).json({
      mensagem: "Nome, email, senha, especialidade e CRM são obrigatórios.",
    });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const [profissional] = await db
      .insert(profissionais)
      .values({
        nome,
        email,
        senha: senhaHash,
        especialidade,
        crm,
      })
      .returning({
        id: profissionais.id,
        nome: profissionais.nome,
        email: profissionais.email,
        especialidade: profissionais.especialidade,
        crm: profissionais.crm,
      });

    return res.status(201).json({
      mensagem: "Profissional cadastrado com sucesso",
      profissional,
    });
  } catch (err: any) {
    console.error("Erro ao cadastrar profissional:", err);
    if (err.code === "23505") {
      if (err.constraint === "profissionais_email_key") {
        return res.status(409).json({ mensagem: "Email já cadastrado." });
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

export const loginProfissional = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  try {
    const profissionalList = await db
      .select()
      .from(profissionais)
      .where(eq(profissionais.email, email));

    const profissional = profissionalList[0];
    if (!profissional) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos." });
    }

    const senhaValida = await bcrypt.compare(senha, profissional.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos." });
    }

    const { senha: _, ...profSemSenha } = profissional;
    const token = jwt.sign(
      { id: profSemSenha.id, email: profSemSenha.email, nome: profSemSenha.nome, role: "profissional" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      profissional: profSemSenha,
      token,
    });
  } catch (err) {
    console.error("Erro ao fazer login do profissional:", err);
    return res.status(500).json({ mensagem: "Erro interno ao realizar login." });
  }
};