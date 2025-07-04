import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Logo from "../../assets/logo_saude_pontual.png";
import "./loginadm.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../api/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function LoginAdm() {
    const [form, setForm] = useState({ email: "", senha: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            const result = await loginAdmin({
                email: form.email,
                senha: form.senha,
            });
            if (result.token) {
                login(result.token);
                navigate("/homeadm");
            } else {
                setError(result.mensagem || "Erro no login");
            }
        } catch (err) {
            setError("Erro no login", err);
        }
    }

    return (
        <div id="background-admin">
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
                <h1 id="title" className="mb-5 fw-normal">
                    SAÚDE PONTUAL <br />
                    ADMINISTRADOR
                </h1>
                <div
                    id="box-form-admin"
                    className="flex justify-content-center align-items-center p-5"
                >
                    <form
                        id="form-admin"
                        className="fs-5"
                        onSubmit={handleSubmit}
                    >
                        {/* Campo de e-mail */}
                        <FormInput
                            id="floating-mail-adm"
                            name="email"
                            label="E-mail"
                            type="email"
                            required={true}
                            value={form.email}
                            onChange={handleChange}
                        />
                        {/* Campo de senha */}
                        <FormInput
                            id="floating-pass-adm"
                            name="senha"
                            label="Senha"
                            type="password"
                            required={true}
                            value={form.senha}
                            onChange={handleChange}
                        />
                        {/* Mensagem de erro */}
                        {error && (
                            <div
                                className="text-danger mb-2"
                                style={{ fontWeight: 600 }}
                            >
                                {error}
                            </div>
                        )}
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
                                    width: 200,
                                    borderRadius: 75,
                                    border: "none",
                                }}
                            />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
