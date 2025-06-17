const express = require("express");
const { criarConsultaPet, listarConsultasPetUsuario } = require("../controllers/consultaPetController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Rota para criar uma nova consulta para pet
router.post("/fichapet", verifyToken, criarConsultaPet);
router.get("/fichapet", verifyToken, listarConsultasPetUsuario);

module.exports = router;