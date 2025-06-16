import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/db.ts";
import { usuarios } from "../db/schema/schema.ts";
import { eq } from "drizzle-orm";

const SECRET_KEY = process.env.JWT_CHAVE;
if (!SECRET_KEY) {
  throw new Error("JWT_CHAVE não está definida no .env");
}

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const cadastrarUsuario = async (req: Request, res: Response) => {
  const { nome, email, telefone, data_nascimento, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Nome, email e senha são obrigatórios",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: "Email inválido" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const formattedDataNascimento = data_nascimento
      ? new Date(data_nascimento).toISOString().split("T")[0]
      : null;

    const [usuario] = await db
      .insert(usuarios)
      .values({
        nome,
        email,
        telefone: telefone || null,
        data_nascimento: formattedDataNascimento,
        senha: senhaHash,
      })
      .returning({
        id: usuarios.id,
        nome: usuarios.nome,
        email: usuarios.email,
      });

    return res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso", usuario });
  } catch (err: any) {
    console.error("Erro ao cadastrar usuário:", err);
    if (err.code === "23505") {
      return res.status(409).json({ mensagem: "Email já cadastrado" });
    }
    return res
      .status(500)
      .json({ mensagem: "Erro interno ao cadastrar usuário" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Email e senha são obrigatórios" });
  }

  try {
    const usuariosFound = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, email));

    const usuario = usuariosFound[0];

    if (!usuario) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const { senha: _, ...userSemSenha } = usuario;

    const token = jwt.sign(
      {
        id: userSemSenha.id,
        email: userSemSenha.email,
        nome: userSemSenha.nome,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      usuario: userSemSenha,
      token,
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    return res
      .status(500)
      .json({ mensagem: "Erro interno ao realizar login" });
  }
};

export const pegarPerfil = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ mensagem: "Parâmetro id é obrigatório" });
  }

  try {
    const usuariosFound = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.id, Number(id)));

    if (usuariosFound.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const { senha, ...usuarioSemSenha } = usuariosFound[0];

    return res.json({ usuario: usuarioSemSenha });
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    return res
      .status(500)
      .json({ mensagem: "Erro interno ao buscar perfil" });
  }
};

export const adicionarInfoPerfil = async (req: Request, res: Response) => {
  const {
    altura,
    peso,
    tipo_sanguineo,
    alergias_conhecidas,
    remedio_continuo,
  } = req.body;

  const reqTyped = req as AuthenticatedRequest;
  const usuario_id = reqTyped.userId;

  if (!usuario_id) {
    return res.status(401).json({ mensagem: "Usuário não autenticado" });
  }

  try {
    await db
      .update(usuarios)
      .set({
        altura,
        peso,
        tipo_sanguineo,
        alergias_conhecidas,
        remedio_continuo,
      })
      .where(eq(usuarios.id, usuario_id));

    return res
      .status(200)
      .json({ mensagem: "Informações de perfil atualizadas com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar informações de perfil:", err);
    return res
      .status(500)
      .json({ mensagem: "Erro ao atualizar informações de perfil" });
  }
};
