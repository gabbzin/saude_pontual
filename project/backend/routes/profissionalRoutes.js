const express = require("express");
const router = express.Router();
const {
    cadastrarProfissional,
    loginProfissional,
    deletarProfissional,
} = require("../controllers/profissionalController");
const {verifyToken} = require("../middleware/authMiddleware")

router.post("/cadastrar", cadastrarProfissional);
router.post("/login", loginProfissional);
router.delete("/:id", verifyToken, deletarProfissional);

module.exports = router;