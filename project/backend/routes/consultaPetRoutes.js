import express from "express";
import { criarConsultaPet, listarConsultasPetUsuario } from "../controllers/consultaPetController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para criar uma nova consulta para pet
router.post("/fichapet", verifyToken, criarConsultaPet);

export default router;