const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

const frontendPath = path.join(__dirname, 'front-end');

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(frontendPath, 'cadastro', 'cadastro.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});