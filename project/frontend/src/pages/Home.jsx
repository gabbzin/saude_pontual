import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
// Assets
import ButtonExit from "../assets/button_exit_1.jpeg";
import FundoLaranja from "../assets/background_orange.jpg";
import ImageParaPet from "../assets/image_para_pet.png";
import ImageParaVoce from "../assets/image_para_voce.png";
import Logo from "../assets/logo_saude_pontual.png";
import ProfileIcon from "../assets/profile_icon.png";
import ProfileButton from "../assets/profile_button.png";
// Components
import Background from "../components/Background";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
// Styles
import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Home(){
     
    const {usuario} = useContext(AuthContext);

    const resolucaoLogoXY = 150;
    const resolucaoProfileXY = 85;
    const resolucaoAgendarXY = 150;

    const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
    const [modalButtons, setModalButtons] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    
    function showModal(dateStr){
        setSelectedDate(dateStr)
        setModalCalendarVisible(true);
        console.log("Estado do Modal do Calendário" + modalCalendarVisible);
    }

    function showModalButtons(){
        setModalButtons(true);
        console.log("Mostrando botões de agendar consulta" + modalButtons);
    }

    return (
        <div id="container">
            <Background imageUrl={FundoLaranja}/>

            <Modal show={modalCalendarVisible} onHide={() => setModalCalendarVisible(false)} centered>
                <Modal.Header closeButton style={{color: "#004D3E", fontFamily: "Passion One", fontSize: "2em"}}>
                    Consulta Agendada
                </Modal.Header>
                <Modal.Body style={{fontFamily: "Inter"}}>
                    Data: {selectedDate} <br />
                    Tipo de consulta: Ortopedia <br /> {/* Alimentar esse campo */}
                    Nome do Profissional: Pedro João <br /> {/* Alimentar esse campo */}
                    Horário: 08:35 {/* Alimentar esse campo */}
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
                        <h1>SEJA BEM-VINDA, {usuario?.nome}</h1>
                    </div>
                    <div id="calendar" style={{height: "100%"}}>
                        <Calendar showModal={showModal}/>
                    </div>
                </main>

                <div className="actions">

                    <Button
                        id={"schedule"}
                        text={"Agendar Consulta"}
                        onClick={showModalButtons}
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

            <Modal className="modal_buttons" show={modalButtons} onHide={() => {setModalButtons(false)}} centered>
                <div id="modais">
                    <Link
                        id={"para_voce"}
                        to={"/fichapessoa"}
                    >
                        <div className="button_container_navigate_schedule">
                            Para Você
                            <div className="button_consulta_image">
                                <img src={ImageParaVoce} alt="Para Você" width={resolucaoAgendarXY} height={resolucaoAgendarXY}/>
                            </div>
                        </div>
                    </Link>
                    <div style={{width: 50, backgroundColor: "white"}}/>
                    <Link
                        id={"para_pet"}
                        to={"/fichapet"}
                    >
                        <div className="button_container_navigate_schedule">
                            Para Pet
                            <div className="button_consulta_image">
                                <img src={ImageParaPet} alt="Para pet" width={resolucaoAgendarXY} height={resolucaoAgendarXY}/>
                            </div>
                        </div>
                    </Link>
                </div>
            </Modal>
        </div>
    );
}