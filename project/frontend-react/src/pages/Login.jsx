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
            <main className="form-signin w-100 m-auto d-flex flex-column align-items-center py-2">
                <h1 id="title" className="mb-3 fw-normal">
                    SAÚDE PONTUAL
                </h1>
                <div id="box-form" className="flex p-3">
                    <form className="align-middle">
                        {/* Campo de e-mail */}
                        <FormInput
                            id="floatingInput"
                            label="E-mail"
                            type="email"
                            placeholder="email@example.com"
                        />
                        {/* Campo de senha */}
                        <FormInput
                            id="floatingPassword"
                            label="Senha"
                            type="password"
                            placeholder="Password"
                        />
                        <Button id={"login-button"} text={"ENTRAR"} onClick={fazerLogin}/>
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


