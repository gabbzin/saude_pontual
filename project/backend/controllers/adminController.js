const jwt = require("jsonwebtoken");

const adminEmail = process.env.ADMIN_EMAIL;
const adminSenha = process.env.ADMIN_SENHA;
const jwtSecret = process.env.JWT_CHAVE;

export async function loginAdmin(req, res) {
    const { email, senha } = req.body;

    if (email === adminEmail && senha === adminSenha) {
        const token = jwt.sign({ role: "admin", email }, jwtSecret, {
            expiresIn: "1h",
        });

        return res.json({ token });
    }

    return res.status(401).json({error: "Credenciais Inválidas"});
}