const express = require("express");
const router = express.Router();
const { criarConsultaPet, listarConsultasPetUsuario } = require("../controllers/consultaPetController");
const { verifyToken } = require("../middleware/authMiddleware");

// Rota para criar uma nova consulta para pet
router.post("/fichapet", verifyToken, criarConsultaPet);

module.exports = router;