const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const consultaPetRoutes = require("./routes/consultaPetRoutes.js");
const profissionalRoutes = require("./routes/profissionalRoutes.js");
const consultaRoutes = require("./routes/consultaRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const { createTables } = require("./db.js");

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
app.use("/api/profissionais", profissionalRoutes);
app.use("/api", consultaRoutes);
app.use("/api", adminRoutes)

async function startServer() {
  try {
    await createTables();
    console.log("Tabelas criadas e usuário administrador configurado.");
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Falha ao inicializar o servidor:", error);
    process.exit(1);
  }
}

startServer();
module.exports = app;