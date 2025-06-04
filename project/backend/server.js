const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const usuarioRoutes = require("./routes/usuarioRoutes");
const consultaRoutes = require("./routes/consultaRoutes"); // Importar as novas rotas de consulta
const {db, createTables} = require("./db");

require("dotenv").config();

const app = express();

// Define a porta onde o servidor vai rodar
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", usuarioRoutes);
app.use("/api", consultaRoutes);

async function startServer() {
    try {
        // Inicializa a criação/atualização das tabelas e aguarda a conclusão
        await createTables();
        
        // Inicia o servidor apenas após a configuração bem-sucedida do banco de dados
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Falha ao inicializar o servidor (erro na criação/atualização de tabelas):", error);
        process.exit(1); // Encerrar o processo se as tabelas não puderem ser configuradas
    }
}

startServer();
