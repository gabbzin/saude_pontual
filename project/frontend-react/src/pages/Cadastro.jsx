import React, {useState} from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import MoModal from "../components/MoModal";
import FormInput from "../components/FormInput"; // Importação do Input
import Button from "../components/Button"; // Importação do Button
import Background from "../components/Background";
import FundoVerde from "../assets/background_green.jpg";
import Logo from "../assets/logo_saude_pontual.png"

export default function Cadastro() {

    const [modalVisible, setModalVisible] = useState(false);

    const fazerCadastro = () => {
        console.log("Passou aqui");
        setModalVisible(true)
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
                                text={"CADASTRAR"} 
                                onClick={fazerCadastro}
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
                        <div id="link" className="mt-1 text-center text-white">
                            Já tem uma conta?{" "}
                            <Link to="/" className="fw-bold text-decoration-none text-white">
                                Fazer login
                            </Link>
                        </div>
                    </form>
                </div>
                <MoModal 
                    show={modalVisible}
                    onClose={() => setModalVisible(false)}
                    text={"Cadastro \n Finalizado"}
                    styleBody={{
                        fontFamily: "Passion One",
                        fontWeight: 400,
                        fontSize: 80,
                        textAlign: "center"
                    }}
                />
            </main>
        </div>
    );
}


