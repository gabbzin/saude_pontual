import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Assets
import Logo from "../../assets/logo_saude_pontual.png";
import ProfileIcon from "../../assets/profile_icon.png";
// Components
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/calendario.css";
import "../../styles/homepro.css";

export default function HomePro() {

    const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const navigate = useNavigate();

    function showModal(dateStr) {
        const formattedDate = new Date(
            dateStr + "T00:00:00"
        ).toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        setSelectedDate(formattedDate);
        setModalCalendarVisible(true);
        console.log("Estado do Modal do Calendário" + modalCalendarVisible);
    }
    
    return (
        <div id="pro_container_home">
            <Modal
                show={modalCalendarVisible}
                onHide={() => setModalCalendarVisible(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    style={{
                        color: "#004D3E",
                        fontFamily: "Passion One",
                        fontSize: "2em",
                    }}
                >
                    Consulta Agendada
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "Inter" }}>
                    Data: {selectedDate} <br />
                    Tipo de consulta: Ortopedia <br />{" "}
                    {/* Alimentar esse campo */}
                    Nome do Profissional: Pedro João <br />{" "}
                    {/* Alimentar esse campo */}
                    Horário: 08:35 {/* Alimentar esse campo */}
                </Modal.Body>
            </Modal>
            <header id="pro_header_home">
                <div id="rebranding">
                    <img src={Logo} id="logo_pro_home" />
                    <h3 id="title_pro_home" className="text-uppercase">
                        Saúde Pontual
                    </h3>
                </div>
                <div id="profilepro">
                    <img src={ProfileIcon} id="icon_pro_home" />
                    <h3 id="perfil_name">Dra. {"Júlia"}</h3>
                </div>
            </header>
            <main id="pro_home_wrapper">
                <section id="writer_relatorio">
                    <div>
                        <h3>Selecionar paciente</h3>
                        <div className="pesquisar_pacientes mt-4">
                            <input
                                type="text"
                                className="input_pesquisar_pacientes"
                                placeholder="PESQUISAR"
                            />
                            <button className="botao_pesquisa">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="#757575"
                                    class="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <textarea name="relatorio_write" id="relatorio_write" rows={20} placeholder="Escrever relatório">

                    </textarea>
                    <Button
                        className={"button_homepro_page"}
                        type={"submit"}
                        onClick={() => {
                            console.log("Enviando relatório");
                        }}
                    >
                        Enviar
                    </Button>
                </section>
                <section id="calendar_history_section">
                    <div id="calendar_pro" style={{ height: "65%" }}>
                        <Calendar showModal={showModal}/>
                    </div>
                    <div id="historico_relatorios">
                        <Button className={"button_homepro_page"} id="historico_e_relatorio" onClick={() => {
                            navigate("/historicopro")
                        }}>
                            Histórico e Relatórios
                        </Button>
                    </div>
                </section>
                <section id="ficha_pacientes">
                    <div>
                        <h2 className="text-uppercase">Ficha de Pacientes</h2>
                        <div className="pesquisar_pacientes mt-4">
                            <input
                                type="text"
                                className="input_pesquisar_pacientes"
                                placeholder="PESQUISAR"
                            />
                            <button className="botao_pesquisa">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    fill="currentColor"
                                    class="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Button
                        className={"button_homepro_page"}
                        onClick={() => {
                            console.log("Abrindo relatórios");
                        }}
                    >
                        Abrir
                    </Button>
                </section>
            </main>
        </div>
    );
}
