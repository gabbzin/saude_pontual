import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import consultaPetRoutes from "./routes/consultaPetRoutes.js";
import profissionalRoutes from "./routes/profissionalRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import { createTables } from "./db.js";

dotenv.config();

const app = express();

// Define a porta onde o servidor vai rodar
const port = 3001;

// health check
app.use("/health", (req, res) => {
  res.status(200).json({ message: "Servidor está rodando!" });
});

app.use(cors());
app.use(express.json());
app.use("/api", usuarioRoutes);
app.use("/api", consultaPetRoutes);
app.use("/api", profissionalRoutes);
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
    console.error("Falha ao inicializar o servidor:", error);
    process.exit(1);
  }
}

startServer();
