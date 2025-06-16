import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { profissionais } from "./schema/schema.ts";
import { eq } from "drizzle-orm";

dotenv.config();

if (
  !process.env.DB_USER ||
  !process.env.DB_SENHA ||
  !process.env.DB_HOST ||
  !process.env.DB_NOME ||
  !process.env.DB_PORT
) {
  throw new Error("Variáveis de ambiente do banco não configuradas corretamente.");
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NOME,
  password: process.env.DB_SENHA,
  port: Number(process.env.DB_PORT),
});

export const db = drizzle(pool);

export async function createAdminUser() {
  const { ADMIN_EMAIL, ADMIN_NOME, ADMIN_SENHA } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_NOME || !ADMIN_SENHA) {
    console.error("Credenciais de administrador não configuradas.");
    return;
  }

  // Verifica se o admin já existe
  const adminExists = await db
    .select()
    .from(profissionais)
    .where(eq(profissionais.email, ADMIN_EMAIL));

  if (adminExists.length > 0) {
    console.log(
      `Usuário administrador padrão '${ADMIN_EMAIL}' já existe, nenhuma ação necessária.`
    );
    return;
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(ADMIN_SENHA, 10);

  // Cria o administrador
  await db
    .insert(profissionais)
    .values({
      nome: ADMIN_NOME,
      email: ADMIN_EMAIL,
      senha: hashedPassword,
      especialidade: "Administrador",
      crm: "ADMIN000",
    })
    .execute();

  console.log(`Usuário administrador padrão '${ADMIN_EMAIL}' criado com sucesso.`);
}

// Chama a criação do admin ao iniciar o processo
createAdminUser().catch((err) => {
  console.error("Erro ao criar usuário administrador:", err);
});