require('dotenv').config();

const { Pool } = require('pg');

// cria uma nova pool de conexões com o banco de dados PostgreSQL
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NOME,
  password: process.env.DB_SENHA,
  port: process.env.DB_PORT
});

module.exports = db;

