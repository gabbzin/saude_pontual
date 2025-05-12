const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Define a porta onde o servidor vai rodar
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);

// Log com a porta do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});