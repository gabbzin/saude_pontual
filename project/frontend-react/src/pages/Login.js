// src/pages/Login.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cadastro_style.css"; // Ajuste o caminho conforme a localização
import FormInput from "../components/FormInput"; // Importando o componente

export default function Login() {
    return (
        <main className="form-signin w-100 m-auto d-flex align-items-center py-2">
            <h1 id="title" className="mb-3 fw-normal">
                SAÚDE PONTUAL
            </h1>
            <div id="box-form" className="flex p-3">
                <form>
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

                    <button
                        id="login-button"
                        className="btn btn-primary d-block w-50 py-2 m-auto my-2"
                        type="submit"
                    >
                        ENTRAR
                    </button>

                    <div id="cadastro" className="mt-1 text-center">
                        Não tem uma conta?{" "}
                        <a href="/cadastro" className="fw-semibold">
                        Cadastre-se
                        </a>
                    </div>
                </form>
            </div>
        </main>
    );
}
