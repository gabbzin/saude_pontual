const express = require("express");
const router = express.Router();
const {
    cadastrarProfissional,
    loginProfissional,
} = require("../controllers/profissionalController");

router.post("/profissionais/cadastrar", cadastrarProfissional);
router.post("/profissionais/login", loginProfissional);

module.exports = router;