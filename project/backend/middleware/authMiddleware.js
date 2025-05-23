const jwt = require("jsonwebtoken");

require("dotenv").config()

const SECRET_KEY = process.env.JWT_CHAVE

exports.verifyToken = function(req, res, next){
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Access denied"});
    } // Sem token Sem Acesso

    const token = authHeader.split("")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token "});
    }
}