import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// Assets
import FundoLaranja from "../../assets/background_orange.jpg";
import ButtonExit from "../../assets/button_exit_1.jpeg";
import GatoIcon from "../../assets/gato_icon.jpeg";
import Logo from "../../assets/logo_saude_pontual.png";
import ProfileButton from "../../assets/profile_button.png";
// Components
import Background from "../../components/Background";
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
import ScheduleButtons from "../../components/ScheduleButtons";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/home.css";

export default function Home() {
    const { usuario } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const resolucaoLogoXY = 140;
    const resolucaoProfileXY = 85;

    const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
    const [modalButtons, setModalButtons] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [consultas, setConsultas] = useState([]);

    function showModal(dateStr, consultas) {
        const formattedDate = new Date(
            dateStr + "T00:00:00"
        ).toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        setSelectedDate(formattedDate);
        setConsultas(consultas);
        setModalCalendarVisible(true);
        console.log("Estado do Modal do Calendário" + modalCalendarVisible);
    }

    function showModalButtons() {
        setModalButtons(true);
        console.log("Mostrando botões de agendar consulta" + modalButtons);
    }

    function fazerLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div id="container">
            <Background imageUrl={FundoLaranja} />

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
                    <p>Data: {selectedDate}</p>
                    {consultas.length > 0 ? (
                        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                            {consultas.map((consulta, index) => (
                                <li key={consulta.id || index} style={{}}>
                                    <strong>Tipo de consulta:</strong>{" "}
                                    {consulta.area_medica_desejada ===
                                    "clinica_geral"
                                        ? "Clínica Geral"
                                        : consulta.area_medica_desejada}{" "}
                                    <br />
                                    <strong>Nome do Profissional:</strong>{" "}
                                    {consulta.profissional} <br />
                                    <strong>Horário:</strong>{" "}
                                    {consulta.hora_para_exibicao}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhuma consulta agendada para esta data.</p>
                    )}
                </Modal.Body>
            </Modal>

            <header id="caixabranca">
                <Button
                    style={{
                        backgroundColor: "#080808",
                        border: "none",
                        margin: 0,
                        padding: 0,
                    }}
                    onClick={fazerLogout}
                >
                    <img src={ButtonExit} height={40} width={60} />
                </Button>
            </header>

            <div className="content-wrapper">
                <aside className="sidebar p-4">
                    <div className="d-grid">
                        <img
                            src={Logo}
                            alt="Logo"
                            width={resolucaoLogoXY}
                            height={resolucaoLogoXY}
                            style={{ margin: "auto", borderRadius: "50%" }}
                        />

                        <h2 className="text-center mt-2 fs-1">SAÚDE PONTUAL</h2>
                    </div>
                    <p className="description fs-6 p-4">
                        Nosso propósito é simplificar sua jornada de cuidados,
                        oferecendo acesso rápido a informações sobre
                        medicamentos, agendamentos de consultas e acompanhamento
                        médico. Com nossa plataforma, conectamos você aos
                        profissionais de saúde de forma ágil e segura, sempre
                        com o apoio da UNICEPLAC.
                        <br />
                        Obrigado por confiar em nós!
                    </p>
                    <Button
                        id={"historico"}
                        text={"HISTÓRICO DE CONSULTAS"}
                        onClick={() => navigate("/historico")}
                        style={{
                            fontSize: "1em",
                        }}
                    />
                </aside>
                <main className="main-content">
                    <div className="header flex">
                        <img
                            className="avatar"
                            src={GatoIcon}
                            alt="Foto de Perfil"
                            width={resolucaoProfileXY}
                            height={resolucaoProfileXY}
                            style={{
                                borderRadius: "50%",
                            }}
                        />
                        <h1 className="text-capitalize">
                            SEJA BEM-VINDO(A), {usuario?.nome}
                        </h1>
                    </div>
                    <div id="calendar" style={{ height: "100%" }}>
                        <Calendar showModal={showModal} />
                    </div>
                </main>

                <div className="actions">
                    <Button
                        id={"schedule"}
                        text={"Agendar Consulta"}
                        onClick={showModalButtons}
                    >
                        <div id="schedule_button">Agendar Consulta</div>
                    </Button>

                    <Button
                        id={"profile"}
                        text={"Ir ao perfil"}
                        onClick={() => {
                            navigate("/perfil");
                        }}
                    >
                        Ir ao perfil
                        <img
                            src={ProfileButton}
                            width={resolucaoLogoXY}
                            height={resolucaoLogoXY}
                        />
                    </Button>
                </div>
                <ScheduleButtons
                    modalButtons={modalButtons}
                    setModalButtons={setModalButtons}
                />
            </div>
        </div>
    );
}
