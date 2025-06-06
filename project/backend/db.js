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
    const client = await db.connect();
    try {
        await client.query('BEGIN'); // Iniciar transação

        // Criação da tabela base de usuários se não existir
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
        console.log("Tabela 'usuarios' base verificada/criada.");

        // Adicionar colunas de informações adicionais à tabela usuarios se não existirem
        const colunasAdicionaisUsuarios = [
            { nome: 'altura', tipo: 'DECIMAL(3, 2) NULL' },
            { nome: 'peso', tipo: 'DECIMAL(5, 2) NULL' },
            { nome: 'tipo_sanguineo', tipo: 'VARCHAR(5) NULL' },
            { nome: 'alergias_conhecidas', tipo: 'TEXT NULL' },
            { nome: 'remedio_continuo', tipo: 'TEXT NULL' }
        ];

        for (const coluna of colunasAdicionaisUsuarios) {
            await client.query(`
                ALTER TABLE usuarios
                ADD COLUMN IF NOT EXISTS ${coluna.nome} ${coluna.tipo};
            `);
            console.log(`Coluna ${coluna.nome} verificada/adicionada à tabela usuarios.`);
        }

        // Criação da tabela de consultas se não existir
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
        console.log("Tabela 'consultas' verificada/criada.");

        // Criação da tabela de consultas_pet se não existir
        await client.query(`
            CREATE TABLE IF NOT EXISTS consultas_pet (
                id SERIAL PRIMARY KEY,
                usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
                nome_pet VARCHAR(255) NOT NULL,
                especie VARCHAR(100) NOT NULL,
                raca VARCHAR(100),
                sexo VARCHAR(50),
                esterilizacao VARCHAR(50), -- Ex: Castrado, Não Castrado, N/A
                cor VARCHAR(100),
                peso_pet DECIMAL(5, 2), -- Peso do pet
                identificacao_pet VARCHAR(255), -- Ex: Microchip, Tatuagem
                historico_saude_pet TEXT,
                motivo_consulta_pet TEXT NOT NULL,
                data_e_hora TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Tabela 'consultas_pet' verificada/criada.");

        // Criação da tabela de profissionais se não existir
        await client.query(`
            CREATE TABLE IF NOT EXISTS profissionais (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                especialidade VARCHAR(255),
                crm VARCHAR(50) UNIQUE, -- Conselho Regional de Medicina ou similar
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Tabela 'profissionais' verificada/criada.");

        await client.query('COMMIT');
        console.log("Tabelas verificadas/criadas/atualizadas com sucesso!");
    } catch (err) {
        await client.query('ROLLBACK'); // Desfazer em caso de erro
        console.error("Erro ao criar/atualizar tabelas:", err);
        throw err; // Propagar o erro para que o servidor possa lidar com ele
    } finally {
        client.release();
    }
}

module.exports = {db, createTables};
