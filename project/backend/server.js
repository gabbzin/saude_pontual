const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');
const db = require('./db');

require('dotenv').config();

const app = express();

// Define a porta onde o servidor vai rodar
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', usuarioRoutes);

// Inicializa a tabela "usuarios" caso não exista
(async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      telefone VARCHAR(20),
      data_nascimento DATE,
      senha VARCHAR(255) NOT NULL
    )`);
    console.log('Tabela "usuarios" verificada/criada com sucesso');
  } catch (err) {
    console.error('Erro ao criar/verificar tabela usuarios:', err);
  }
})();

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});