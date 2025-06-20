const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {verifyToken, isAdmin} = require("../middleware/authMiddleware");

// Rotas abaixo protegidas para acesso exclusivo do admin
router.use(verifyToken, isAdmin);

router.post("/loginadm", adminController.loginAdmin);

module.exports = router;
