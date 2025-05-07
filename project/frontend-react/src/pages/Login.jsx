import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import FormInput from "../components/FormInput"; // Importação do Input
import Button from "../components/Button"; // Importação do Button
import BackgroundGreen from "../components/BackgroundGreen";
import FundoVerde from "../assets/background_green.jpg";

export default function Login() {
    const fazerLogin = () => {
        console.log("Passou aqui");
    }

    return (
        <div id="background" className="d-flex align-items-center">
            <BackgroundGreen imageUrl={FundoVerde}/>
            <img src="../assets/logo_saude_pontual.png" alt=""/>
            <main className="form-signin w-100 m-auto d-flex flex-column align-items-center py-2">
                <h1 id="title" className="mb-3 fw-normal">
                    SAÚDE PONTUAL
                </h1>
                <div id="box-form" className="flex justify-content-center align-items-center p-3">
                    <form>
                        {/* Campo de e-mail */}
                        <FormInput
                            id="floatingInput"
                            label="E-mail"
                            type="email"
                        />
                        {/* Campo de senha */}
                        <FormInput
                            id="floatingPassword"
                            label="Senha"
                            type="password"
                        />
                        {/* Botão de Login */}
                        <div id="botao" className="flex text-center w-100">
                            <Button
                                id={"login-button"} 
                                text={"ENTRAR"} 
                                onClick={fazerLogin}
                                style={{
                                    padding: 16,
                                    margin: 8,
                                    fontSize: "1.5em",
                                    width: 150,
                                    borderRadius: 75,
                                }}
                            />
                        </div>
                        {/* Redirecionamento para fazer cadastro */}
                        <div id="cadastro" className="mt-1 text-center">
                            Não tem uma conta?{" "}
                            <a href="/cadastro" className="fw-semibold">
                                Cadastre-se
                            </a>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}


