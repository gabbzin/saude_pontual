const jwt = require("jsonwebtoken");

require("dotenv").config()

const SECRET_KEY = process.env.JWT_CHAVE

exports.verifyToken(req, res, next){
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({error: "Access denied"}); // Sem token Sem Acesso

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token "});
    }
}