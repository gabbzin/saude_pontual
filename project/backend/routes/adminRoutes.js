const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/loginadm", adminController.loginAdmin);

module.exports = router;
