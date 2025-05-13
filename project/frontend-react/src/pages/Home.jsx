import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// Assets
import FundoLaranja from "../assets/background_orange.jpg";
import Logo from "../assets/logo_saude_pontual.png";
import ProfileIcon from "../assets/profile_icon.png";
import ProfileButton from "../assets/profile_button.png";
import ButtonExit from "../assets/button_exit_1.jpeg";
// Components
import Background from "../components/Background";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
// Variaveis
import { today } from "../components/Calendar";

import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home(){

    const resolucaoLogoXY = 150;
    const resolucaoProfileXY = 85;

    const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
    
    function showModal(){
        setModalCalendarVisible(true);
        console.log("Estado do Modal do Calendário" + modalCalendarVisible);
    }

    return (
        <div id="container">
            <Background imageUrl={FundoLaranja}/>

            <Modal show={modalCalendarVisible} onHide={() => setModalCalendarVisible(false)} centered>
                <Modal.Header closeButton style={{color: "#004D3E", fontFamily: "Passion One", fontSize: "2em"}}>
                    Consulta Agendada
                </Modal.Header>
                <Modal.Body style={{fontFamily: "Inter"}}>
                    Data: {today} <br />
                    Tipo de consulta: Ortopedia <br />
                    Nome do Profissional: Pedro João <br />
                    Horário: 08:35
                </Modal.Body>
            </Modal>

            <header id="caixabranca">
                <Button style={{
                        backgroundColor: "#080808",
                        border: "None",
                        margin: 0,
                        padding: 0
                    }}
                >

                    <img src={ButtonExit} height={40} width={60}/>
                </Button>
            </header>

            <div className="content">
                <aside className="sidebar p-4">
                
                    <div className="d-grid">
                        <img src={Logo} alt="Logo" width={resolucaoLogoXY} height={resolucaoLogoXY}
                            style={{margin: "auto", borderRadius: "50%"}}/>

                        <h2 className="text-center mt-2 fs-1">SAÚDE PONTUAL</h2>
                    </div>
                    <p className="description fs-6 p-4">
                        Nosso propósito é simplificar sua jornada de cuidados,
                        oferecendo acesso rápido a informações sobre medicamentos,
                        agendamentos de consultas e acompanhamento médico.
                        Com nossa plataforma, conectamos você aos profissionais de
                        saúde de forma ágil e segura, sempre com o apoio da UNICEPLAC.
                        <br />
                        Obrigado por confiar em nós!
                    </p>
                    <Button
                        id={"historico"}
                        text={"HISTÓRICO DE CONSULTAS"}
                        onClick={() => {
                            console.log("Abrir Histórico")
                        }}
                        style={{
                            backgroundColor: "#016C6C",
                            fontFamily: "Lilita One",
                            fontSize: "1.4em",
                            borderRadius: "35px"
                        }}
                    />
                </aside>
                <main className="main-content">
                    <div className="header flex">
                        <img className="avatar" src={ProfileIcon} alt="Foto de Perfil"
                            width={resolucaoProfileXY} height={resolucaoProfileXY}
                            style={{
                                borderRadius: "50%"
                            }}
                        />
                        <h1>SEJA BEM-VINDA, THALITA KAMILLE!</h1>
                    </div>
                    <div id="calendar" style={{height: "100%"}}>
                        <Calendar showModal={showModal}/>
                    </div>
                </main>

                <div className="actions">

                    <Button
                        id={"schedule"}
                        text={"Agendar Consulta"}
                        onClick={() => {console.log("Agendar Consulta")}}
                    >
                        <div id="schedule_button">
                            Agendar Consulta
                        </div>
                    </Button>

                    <Button
                        id={"profile"}
                        text={"Ir ao perfil"}
                        onClick={() => {console.log("Ir ao perfil")}}
                    >
                        Ir ao perfil
                        <img src={ProfileButton} width={resolucaoLogoXY} height={resolucaoLogoXY}/>
                    </Button>

                </div>
            </div>
        </div>
    );
}