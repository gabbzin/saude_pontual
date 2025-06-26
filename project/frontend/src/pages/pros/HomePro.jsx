import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// Assets
import Logo from "../../assets/logo_saude_pontual.png";
import ProfileIcon from "../../assets/profile_icon.png";
import ButtonExit from "../../assets/button_exit.png";
// Components
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/calendario.css";
import "../../styles/homepro.css";
// api
import { buscarConsultas, adicionarRelatorioConsulta } from "../../../api/api";

export default function HomePro() {
    const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    const [consultasDoDia, setConsultasDoDia] = useState([]);
    const [selectedConsultaId, setSelectedConsultaId] = useState("");
    const [relatorioText, setRelatorioText] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [consultasCalendario, setConsultasCalendario] = useState([]);

    function logoutUser() {
        logout();
        navigate("/");
        console.log("Usuário deslogado");
    }

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const data = await buscarConsultas();
                if (data && data.consultas) {
                    setConsultasCalendario(data.consultas);
                }
            } catch (error) {
                console.error("Erro ao buscar as consultas do profissional", error);
            }
        };

        fetchConsultas();
    }, []);

    const handleEnviarRelatorio = async () => {

        if(!selectedConsultaId || !relatorioText){
            setMensagem("Por favor, selecione um paciente e escreva o relatório");
            return;
        }

        setMensagem("")
        setLoading(true);

        try {
            const result = await adicionarRelatorioConsulta(selectedConsultaId, {relatorio: relatorioText});
            if (result.mensagem){
                setMensagem(result.mensagem);
                setRelatorioText(""); // Limpando o text area
            } else {
                setMensagem("Erro ao enviar relatório.");
            }
        } catch (error){
            setMensagem("Erro na requisição", error);
        }
    }

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
                                    <strong>Nome do Paciente:</strong>{" "}
                                    {consulta.usuario_nome || "-"} <br />
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
            <header id="pro_header_home">
                <div id="rebranding">
                    <img src={Logo} id="logo_pro_home" />
                    <h3 id="title_pro_home" className="text-uppercase">
                        Saúde Pontual
                    </h3>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                    }}
                >
                    <div id="profilepro">
                        <img src={ProfileIcon} id="icon_pro_home" />
                        <h3 id="perfil_name">{usuario.nome}</h3>
                    </div>
                    <div>
                        <Button
                            onClick={logoutUser}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={ButtonExit}
                                id="exit_pro_home"
                                width={45}
                                height={45}
                            />
                        </Button>
                    </div>
                </div>
            </header>
            <main id="pro_home_wrapper">
                <section id="writer_relatorio">
                    <div>
                        <div id="inline-div">
                            <h3>Selecionar paciente</h3>
                            <div id="historico_relatorios">
                                <Button
                                    className={"button_homepro_page"}
                                    id="historico_e_relatorio"
                                    onClick={() => {
                                        navigate("/historicopro");
                                    }}
                                >
                                    Histórico e Relatórios
                                </Button>
                            </div>
                        </div>
                        <select className="form-select mt-2" value={selectedConsultaId} onChange={(e) => {
                            setSelectedConsultaId(e.target.value);
                            const consulta = consultasDoDia.find(c => c.id === parseInt(e.target.value)); // Puxa a consulta correspondente
                            setRelatorioText(consulta?.relatorio || ""); // Carrega o relatório
                        }}>
                            <option value="">Selecione uma consulta</option>
                            {consultasDoDia.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.paciente_nome} - {c.data_para_exibicao} {c.hora_para_exibicao}
                                </option>
                            ))}
                        </select>

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
                                    className="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <textarea
                        name="relatorio_write"
                        id="relatorio_write"
                        rows={12}
                        placeholder="Escrever relatório"
                        value={relatorioText}
                        onChange={(e) => setRelatorioText(e.target.value)}
                        disabled={!selectedConsultaId || loading}
                    ></textarea>

                    {mensagem && <p className="mt-2">{mensagem}</p>}

                    <Button
                        className={"button_homepro_page"}
                        type={"submit"}
                        onClick={handleEnviarRelatorio}
                        disabled={loading || !selectedConsultaId}>

                        {loading ? "Salvando..." : "Salvar Relatório"}
                    </Button>
                </section>
                <section id="calendar_history_section">
                    <div id="calendar_pro">
                        <Calendar consultas={consultasCalendario} showModal={showModal} />
                    </div>
                </section>
            </main>
        </div>
    );
}
