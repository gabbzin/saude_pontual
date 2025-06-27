import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// API
import { buscarConsultas, adicionarRelatorioConsulta } from "../../../api/api"; 
// Assets & Components
import Logo from "../../assets/logo_saude_pontual.png";
import ProfileIcon from "../../assets/logo_medico.jpg";
import ButtonExit from "../../assets/button_exit.png";
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
import LegendaCalendario from "../../components/LegendaCalendar";
import MoModal from "../../components/MoModal";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/calendario.css";
import "../../styles/homepro.css";

export default function HomePro() {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    // --- ESTADO UNIFICADO ---
    const [consultas, setConsultas] = useState([]); 
    
    // --- ESTADOS PARA CONTROLAR A INTERFACE ---
    const [selectedConsultaId, setSelectedConsultaId] = useState("");
    const [relatorioText, setRelatorioText] = useState("");
    const [nomePacienteInput, setNomePacienteInput] = useState(""); // Para o campo de busca
    const [loading, setLoading] = useState(false);
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
    const [modalFeedbackText, setModalFeedbackText] = useState("");

    // --- ESTADOS QUE CONTROLAM O MODAL DO CALENDÁRIO ---
    const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [consultasParaModal, setConsultasParaModal] = useState([]);

    // --- FUNÇÕES DE LÓGICA ---

    function logoutUser() {
        logout();
        navigate("/");
    }

    // Busca os dados e salva na nossa ÚNICA fonte da verdade: 'consultas'
    useEffect(() => {
        const fetchConsultas = async () => {
            setLoading(true);
            try {
                const data = await buscarConsultas(); 
                if (data && data.consultas) {
                    setConsultas(data.consultas);
                }
            } catch (error) {
                setModalFeedbackText("Erro ao carregar consultas.");
                setModalFeedbackVisible(true);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultas();
    }, []);

    // Função para o campo de busca com autocomplete
    const handleSelecaoPaciente = (event) => {
        const valorInput = event.target.value;
        setNomePacienteInput(valorInput);

        const options = document.querySelectorAll("#lista-pacientes option");
        const opcaoSelecionada = Array.from(options).find(opt => opt.value === valorInput);

        if (opcaoSelecionada) {
            const id = opcaoSelecionada.getAttribute('data-id');
            const consulta = consultas.find(c => c.id.toString() === id);

            setSelectedConsultaId(id);
            setRelatorioText(consulta?.relatorio || "");
            setModalFeedbackVisible(false); 
        } else {
            setSelectedConsultaId("");
            setRelatorioText("");
        }
    };

    // Função para o botão "Salvar Relatório"
    const handleEnviarRelatorio = async () => {
        if (!selectedConsultaId || !relatorioText) {
            setModalFeedbackText("Selecione um paciente e escreva o relatório.");
            setModalFeedbackVisible(true);
            return;
        }
        setLoading(true);
        try {
            const result = await adicionarRelatorioConsulta(selectedConsultaId, { relatorio: relatorioText });
            setModalFeedbackText(result.mensagem);
            setModalFeedbackVisible(true);
            if (result.mensagem && result.mensagem.toLowerCase().includes('sucesso')) {
                setRelatorioText("");
                setSelectedConsultaId("");
                setNomePacienteInput("");
                const consultasAtualizadas = consultas.map(c => 
                    c.id.toString() === selectedConsultaId ? { ...c, relatorio: relatorioText } : c
                );
                setConsultas(consultasAtualizadas);
            }
        } catch (error) {
            setModalFeedbackText("Erro na requisição ao salvar.");
            setModalFeedbackVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    // Função do modal que usa seu próprio state para não dar conflito
    function showModal(dateStr, consultasDoDia) {
        const formattedDate = new Date(dateStr + "T00:00:00").toLocaleDateString("pt-br", {
            weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
        });
        setSelectedDate(formattedDate);
        setConsultasParaModal(consultasDoDia); 
        setModalCalendarVisible(true);
    }

    return (
        <div id="pro_container_home">
            <MoModal
                show={modalFeedbackVisible}
                onClose={() => setModalFeedbackVisible(false)}
                text={modalFeedbackText}
            />
            <Modal show={modalCalendarVisible} onHide={() => setModalCalendarVisible(false)} centered>
                <Modal.Header closeButton style={{ color: "#004D3E", fontFamily: "Passion One", fontSize: "2em" }}>
                    Consulta Agendada
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "Inter" }}>
                    <p>Data: {selectedDate}</p>
                    {consultasParaModal.length > 0 ? (
                        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                            {consultasParaModal.map((consulta) => (
                                <li key={consulta.id}>
                                    <strong>Paciente:</strong> {consulta.paciente_nome || consulta.nome} <br />
                                    <strong>Horário:</strong> {consulta.hora_para_exibicao}
                                </li>
                            ))}
                        </ul>
                    ) : <p>Nenhuma consulta agendada para esta data.</p>}
                </Modal.Body>
            </Modal>
            
            <header id="pro_header_home">
                <div id="rebranding">
                    <img src={Logo} id="logo_pro_home" alt="Logo Saúde Pontual"/>
                    <h3 id="title_pro_home" className="text-uppercase">Saúde Pontual</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <div id="profilepro">
                        <img src={ProfileIcon} id="icon_pro_home" alt="Ícone de Perfil"/>
                        <h3 id="perfil_name">{usuario?.nome}</h3>
                    </div>
                    <div>
                        <Button onClick={logoutUser} style={{ backgroundColor: "transparent", border: "none", padding: 0 }}>
                            <img src={ButtonExit} id="exit_pro_home" width={45} height={45} alt="Botão de Sair"/>
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
                                <Button className={"button_homepro_page"} id="historico_e_relatorio" onClick={() => navigate("/historicopro")}>
                                    Histórico e Relatórios
                                </Button>
                            </div>
                        </div>

                        <div>
                            <input 
                                className="form-control mt-2"
                                type="text"
                                list="lista-pacientes"
                                value={nomePacienteInput}
                                onChange={handleSelecaoPaciente}
                                placeholder="Digite o nome do paciente para buscar..."
                                disabled={loading}
                            />
                            <datalist id="lista-pacientes">
                                {consultas.map(c => (
                                    <option 
                                        key={c.id} 
                                        value={`${c.paciente_nome || c.nome} - ${c.data_para_exibicao}`}
                                        data-id={c.id}
                                    />
                                ))}
                            </datalist>
                        </div>
                    </div>
                    
                    <textarea
                        name="relatorio_write" id="relatorio_write" rows={12}
                        placeholder="Escrever relatório..."
                        value={relatorioText}
                        onChange={(e) => setRelatorioText(e.target.value)}
                        disabled={!selectedConsultaId || loading}
                    ></textarea>

                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <Button
                            className={"button_homepro_page"}
                            onClick={handleEnviarRelatorio}
                            disabled={loading || !selectedConsultaId}
                        >
                            {loading ? "Salvando..." : "Salvar Relatório"}
                        </Button>
                    </div>
                </section>

                <section id="calendar_history_section">
                    <LegendaCalendario/>
                    <div id="calendar_pro">
                        <Calendar consultas={consultas} showModal={showModal} />
                    </div>
                </section>
            </main>
        </div>
    );
}