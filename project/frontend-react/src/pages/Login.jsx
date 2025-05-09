import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import FormInput from "../components/FormInput"; // Importação do Input
import Button from "../components/Button"; // Importação do Button
import MoModal from "../components/MoModal";
import Background from "../components/Background";
import FundoVerde from "../assets/background_green.jpg";
import Logo from "../assets/logo_saude_pontual.png";

export default function Login() {

    const fazerLogin = () => {
        console.log("Passou aqui");
    }

    return (
        <div id="background" className="d-flex align-items-center">
            <Background imageUrl={FundoVerde}/>
            <img 
                src={Logo} 
                alt="Foto da empresa"
                width={75}
                height={75}
                className="position-absolute top-0"
                style={{
                    marginTop: 10,
                    marginLeft: 15
                }}
            />
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
                            required={true}
                        />
                        {/* Campo de senha */}
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
                                onClick={fazerLogin}
                                style={{
                                    padding: 16,
                                    margin: 8,
                                    fontSize: "1.5em",
                                    width: 150,
                                    borderRadius: 75,
                                    border: "None"
                                }}
                            />
                        </div>
                        {/* Redirecionamento para fazer cadastro */}
                        <div id="link" className="mt-1 text-center">
                            Não tem uma conta?{" "}
                            <Link to="/cadastro" className="fw-semibold">
                                Cadastre-se
                            </Link>
                        </div>
                    </form>
                </div>
                <MoModal text={"Cadastro Finalizado"}/>
            </main>
        </div>
    );
}


