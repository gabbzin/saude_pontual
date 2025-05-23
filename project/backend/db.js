require("dotenv").config();

const { Pool } = require("pg");

// cria uma nova pool de conexões com o banco de dados PostgreSQL
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NOME,
    password: process.env.DB_SENHA,
    port: process.env.DB_PORT,
});

async function createTables() {
    try {
        const client = await db.connect();

        await client.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                telefone VARCHAR(20),
                data_nascimento DATE,
                senha VARCHAR(255) NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS consultas (
                id SERIAL PRIMARY KEY,
                usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
                nome VARCHAR(255) NOT NULL,
                idade INTEGER NOT NULL,
                peso DECIMAL(5, 2) NOT NULL,
                altura DECIMAL(5, 2) NOT NULL,
                tipo_sanguineo VARCHAR(5) NOT NULL,
                historico_de_saude TEXT NOT NULL,
                area_medica_desejada VARCHAR(255) NOT NULL,
                data_e_hora TIMESTAMP NOT NULL,
                motivo TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        client.release();
        console.log("Tabelas verificadas/criadas com sucesso!");
    } catch (err) {
        console.error("Erro ao criar tabelas:", err);
    }
}

module.exports = {db, createTables};
