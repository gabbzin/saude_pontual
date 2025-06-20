const express = require("express");
const router = express.Router();
const {
    cadastrarProfissional,
    loginProfissional,
    deletarProfissional,
} = require("../controllers/profissionalController");

router.post("/profissionais/cadastrar", cadastrarProfissional);
router.post("/profissionais/login", loginProfissional);
router.delete("/profissionais/:id", deletarProfissional);

module.exports = router;