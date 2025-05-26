import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// Assets
import BackButton from "../assets/back_button.png";
import ButtonEdit from "../assets/button_edit.png";
import FundoLaranja from "../assets/background_orange.jpg";
// Componentes
import Background from "../components/Background";
import Button from "../components/Button";
import ScheduleButtons from "../components/ScheduleButtons";
// Styles
import "../styles/perfil.css";

export default function Perfil(){
    
    const usuario = useContext(AuthContext);
    const logout = useContext(AuthContext);

    const [modalButtons, setModalButtons] = useState(false);
    const navigate = useNavigate();

    function showModalButtons(){
        setModalButtons(true);
    }

    function fazerLogout(){
        logout();
        navigate("/login")
    }

    function redirectToHome(){
        navigate("/")
    }

    return (
        <div id="profile_container">
            <Background imageUrl={FundoLaranja}/>

            <header id="profile_box">
                <Button style={{
                        backgroundColor: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }} onClick={redirectToHome}
                >

                    <img src={BackButton} height={35} width={35}/>
                </Button>
            </header>
            <div id="profile_container_wrapper">
                <main id="informations_container">
                    <div id="avatar">

                    </div>
                    <div id="informations_profile">
                        <h2>{usuario?.nome}Thalita</h2>
                        <div id="informations">
                            email: thalita12@email.com
                            telefone: (61) 99999-9999
                            matrícula: 40028922
                            data de nascimento: 31/12/2000
                        </div>
                        <Button>
                            <img src={ButtonEdit} />
                        </Button>
                    </div>
                </main>
                <section>
                    <h3>Redirecionamento</h3>
                    <Button className={"redirect_profile_buttons"} onClick={redirectToHome}>INíCIO</Button>
                    <Button className={"redirect_profile_buttons"}>HISTÓRICO</Button>
                    <Button className={"redirect_profile_buttons"} onClick={showModalButtons}>AGENDAMENTO</Button>
                    <Button className={"redirect_profile_buttons"} onClick={fazerLogout}>SAIR</Button>
                </section>
                <aside>
                    <h2>Informações Adicionais</h2>
                    <p>Idade: {/* Preencha este campo */}</p>
                    <p>Altura: {/* Preencha este campo */}</p>
                    <p>Peso: {/* Preencha este campo */}</p>
                    <p>Tipo Sanguíneo: {/* Preencha este campo */}</p>
                    <p>Alergias conhecidas: {/* Preencha este campo */}</p>
                    <p>Remédio Contínuo: {/* Preencha este campo */}</p>

                    <Button 
                        text={"EDITAR FICHA"}
                        onClick={console.log("Editando ficha")}
                        style={{
                            backgroundColor: "#016C6C",
                            border: "none",
                            fontSize: "1.4em"
                        }}
                    />
                </aside>
                <ScheduleButtons 
                    modalButtons={modalButtons}
                    setModalButtons={setModalButtons}
                />
            </div>
        </div>
    );
}