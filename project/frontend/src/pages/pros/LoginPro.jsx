import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// Assets
import FundoVerde from "../../assets/background_green.jpg";
import Logo from "../../assets/logo_saude_pontual.png";
// Components
import Background from "../../components/Background"; // Importação do Background
import Button from "../../components/Button"; // Importação do Button
import FormInput from "../../components/FormInput"; // Importação do Input
import MoModal from "../../components/MoModal"; // Importação do MoModal
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/login_cadastro.css";
// api
import { loginProfissional } from "../../../api/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", senha: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Atualiza campo do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await loginProfissional(form);
            if (result.token) {
                login(result.token)
                navigate("/homepro");
            } else {
                setError(result.mensagem || "Erro no login");
            }
        } catch (err) {
            setError(err.message || "Erro no login");
        }
    };

    return (
        <div id="background" className="d-flex align-items-center">
            <Background imageUrl={FundoVerde} />
            <img
                src={Logo}
                alt="Foto da empresa"
                width={75}
                height={75}
                className="position-absolute top-0"
                style={{
                    marginTop: 10,
                    marginLeft: 15,
                }}
            />
            <main className="form-signin w-100 m-auto d-flex flex-column align-items-center py-2">
                <h1 id="title" className="mb-3 fw-normal text-uppercase">
                    Saúde Pontual <br /> Profissional
                </h1>
                <div
                    id="box-form"
                    className="flex justify-content-center align-items-center p-3"
                >
                    <form onSubmit={handleSubmit}>
                        {/* Campo de e-mail */}
                        <FormInput
                            id="floatingInput"
                            name="email"
                            label="E-mail"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required={true}
                        />
                        {/* Campo de senha */}
                        <FormInput
                            id="floatingPassword"
                            name="senha"
                            label="Senha"
                            type="password"
                            value={form.senha}
                            onChange={handleChange}
                            required={true}
                        />
                        {/* Obseto, porque já tem PopUp */}
                        {/* Exibe mensagem de erro
                        {error && (
                            <div className="text-danger mb-2">{error}</div>
                        )} */}
                        {/* Botão de Login */}
                        <div id="botao" className="flex text-center w-100">
                            <Button
                                id={"login-button"}
                                text={"ENTRAR"}
                                type="submit"
                                style={{
                                    padding: 16,
                                    margin: 8,
                                    fontSize: "1.5em",
                                    width: 150,
                                    borderRadius: 75,
                                    border: "none",
                                }}
                            />
                        </div>
                        {/* Redirecionamento para fazer cadastro */}
                        <div id="link" className="mt-1 text-center text-white">
                            Não tem uma conta?{" "}
                            <Link
                                to="/cadastro"
                                className="fw-bold text-decoration-none text-white"
                            >
                                Cadastre-se
                            </Link>
                        </div>
                    </form>
                </div>
                <MoModal
                    show={error}
                    onClose={() => setError(false)}
                    text={error}
                    styleBody={{
                        fontFamily: "Passion One",
                        fontWeight: 400,
                        fontSize: 48,
                        textAlign: "center",
                    }}
                />
            </main>
        </div>
    );
}
