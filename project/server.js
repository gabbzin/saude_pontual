const express = require('express');
const path = require('path');
const app = express();

const frontendPath = path.join(__dirname, 'front-end');

app.use(express.static(frontendPath));

