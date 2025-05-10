const express = require('express');
const path = require('path');
const app = express();

// Define a porta onde o servidor vai rodar
const port = 3001;

// Log com a porta do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});