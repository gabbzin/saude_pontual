import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

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