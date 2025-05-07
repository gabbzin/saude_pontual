import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import FormInput from "../components/FormInput"; // Importação do Input
import Button from "../components/Button"; // Importação do Button
import BackgroundGreen from "../components/BackgroundGreen";
import FundoVerde from "../assets/background_green.jpg";

export default function Cadastro() {
    const fazerCadastro = () => {
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

                        {/* Campo de nome */}
                        <FormInput
                            id="floatingName"
                            label="Nome"
                            type="text"
                            required={true}
                        />
                        {/* Campo de Data de Nascimento */}
                        <FormInput
                            id="floatingDateOfBirth"
                            label="Data de Nascimento"
                            type="date"
                            required={true}
                        />
                        <FormInput
                            id="floatingPhoneNumber"
                            label="Telefone"
                            type="number"
                            required={false}
                            min="10000000000"
                        />
                        {/* Campo de e-mail */}
                        <FormInput
                            id="floatingInput"
                            label="E-mail"
                            type="email"
                            required={true}
                        />
                        {/* Campo de Senha */}
                        <FormInput
                            id="floatingPassword"
                            label="Senha"
                            type="password"
                            required={true}
                        />


                        {/* Botão de Login */}
                        <div id="botao" className="flex text-center w-100">
                            <Button
                                id={"login-button"} 
                                text={"ENTRAR"} 
                                onClick={fazerCadastro}
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
                        <div id="login" className="mt-1 text-center text-white">
                            Já tem uma conta?{" "}
                            <a href="/login" className="fw-bold text-decoration-none text-white">
                                Fazer login
                            </a>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}


