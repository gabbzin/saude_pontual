const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET_KEY = process.env.JWT_CHAVE;

exports.verifyToken = function (req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied" });
    } // Sem token Sem Acesso

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        req.userRole = decoded.role; // Verificação da role
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({
                    error: "Sessão expirada. Por favor, faça login novamente.",
                });
        }

        return res.status(401).json({ error: "Token inválido ou malformado." });
    }
};

exports.isAdmin = function (req, res, next) {
    if (req.userRole !== "admin") {
        return res.status(403).json({ error: "Acesso negado: Somente admins" });
    }
    next();
};
