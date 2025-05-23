const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const usuarioRoutes = require("./routes/usuarioRoutes");
const {db, createTables} = require("./db");

require("dotenv").config();

const app = express();

// Define a porta onde o servidor vai rodar
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", usuarioRoutes);

// Inicializa a criação das tabelas
createTables()

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
