import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// Assets
import BackButton from "../assets/back_button.png";
import ButtonEdit from "../assets/button_edit.png";
import FundoLaranja from "../assets/background_orange.jpg";
import ProfileIcon from "../assets/profile_icon.png";
// Componentes
import Background from "../components/Background";
import Button from "../components/Button";
import ScheduleButtons from "../components/ScheduleButtons";
// Styles
import "../styles/perfil.css";

export default function Perfil() {

    const { usuario, logout } = useContext(AuthContext); // Simplificado

    const [modalButtons, setModalButtons] = useState(false);
    const navigate = useNavigate();

    function showModalButtons() {
        setModalButtons(true);
    }

    function fazerLogout() {
        if (logout) logout(); // Verificação se logout existe
        navigate("/login")
    }

    function redirectToHome() {
        navigate("/")
    }

    return (
        <div id="profile_container">
            <Background imageUrl={FundoLaranja} />

            <header id="profile_box">
                <Button style={{
                    backgroundColor: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                }} onClick={redirectToHome}
                >
                    <img src={BackButton} height={35} width={35} alt="Voltar"/>
                </Button>
            </header>

            <div id="profile_container_wrapper">
                <div id="main_content_container">
                    <main id="informations_container">
                        <div id="avatar">
                            <img src={ProfileIcon} alt="Avatar" />
                        </div>
                        <div id="informations_profile">
                            <h2>{"Thalita Kamille Silva"}</h2>
                            <div id="informations">
                                
                                <span>email: { "thalita12hufdhus@gmail.com"}</span>
                                <span>telefone: {usuario?.telefone || "(61) 99999-9999"}</span>
                                <span>matrícula única: {usuario?.matricula || "12124635234"}</span>
                                <span>cpf: {usuario?.cpf || "000.000.000-00"}</span>
                                <span>data nascimento: {usuario?.dataNascimento || "15/05/1998"}</span>
                            </div>
                            <Button>
                                <img src={ButtonEdit} alt="Editar"/>
                            </Button>
                        </div>
                    </main>

                    <section className="redirect-section">
                        <h3>Redirecionamento</h3>
                        <Button className={"redirect_profile_buttons"} onClick={redirectToHome}>INÍCIO</Button>
                        <Button className={"redirect_profile_buttons"}>HISTÓRICO</Button>
                        <Button className={"redirect_profile_buttons"} onClick={showModalButtons}>AGENDAMENTO</Button>
                        <Button className={"redirect_profile_buttons"} onClick={fazerLogout}>SAIR</Button>
                    </section>
                </div>

                <aside id="profile_aside">
                    <h2>INFORMAÇÕES ADICIONAIS</h2>
                    <p>Idade: {/* Preencha este campo */}</p>
                    <p>Altura: {/* Preencha este campo */}</p>
                    <p>Peso: {/* Preencha este campo */}</p>
                    <p>Tipo sanguíneo: {/* Preencha este campo */}</p>
                    <p>Alergias conhecidas: {/* Preencha este campo */}</p>
                    <p>Remédio contínuo: {/* Preencha este campo */}</p>

                    <Button>
                        EDITAR FICHA
                    </Button>
                </aside>

                <ScheduleButtons
                    modalButtons={modalButtons}
                    setModalButtons={setModalButtons}
                />
            </div>
        </div>
    );
}