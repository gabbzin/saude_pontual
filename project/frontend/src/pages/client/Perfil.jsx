import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Dados from "../../dados.json";
// Assets
import { atualizarInfoPerfil, buscarPerfil } from "../../../api/api";
import BackButton from "../../assets/back_button.png";
import FundoLaranja from "../../assets/background_orange.jpg";
import ButtonEdit from "../../assets/button_edit.png";
import GatoIcon from "../../assets/gato_icon.jpeg";
// Componentes
import Background from "../../components/Background";
import Button from "../../components/Button";
import FormInputSchedule from "../../components/FormInputSchedule";
import ScheduleButtons from "../../components/ScheduleButtons";
// Styles
import "../../styles/perfil.css";

export default function Perfil() {
    
    const { usuario, logout } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const [modalButtons, setModalButtons] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({
        telefone: "",
        data_nascimento: "",
        altura: "",
        peso: "",
        tipo_sanguineo: "",
        alergias_conhecidas: "",
        remedio_continuo: "",
    });
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        const carregarInformacoesAdicionais = async () => {
            if (!token) return;
            
            try {
                const perfil = await buscarPerfil(token);
                
                if (perfil?.usuario){
                    const dataNascimentoFormatada = formatarDataPtBr(perfil.usuario.data_nascimento);
                    console.log(dataNascimentoFormatada);

                    setAdditionalInfo((prev) => ({
                        telefone: perfil.usuario.telefone ? `${perfil.usuario.telefone}` : prev.telefone,
                        data_nascimento: dataNascimentoFormatada ? `${dataNascimentoFormatada}` : prev.data_nascimento,
                        altura: perfil.usuario.altura ? `${perfil.usuario.altura}` : prev.altura,
                        peso: perfil.usuario.peso ? `${perfil.usuario.peso}` : prev.peso,
                        tipo_sanguineo: perfil.usuario.tipo_sanguineo ? `${perfil.usuario.tipo_sanguineo}` : prev.tipo_sanguineo,
                        alergias_conhecidas: perfil.usuario.alergias_conhecidas ? `${perfil.usuario.alergias_conhecidas}` : prev.alergias_conhecidas,
                        remedio_continuo: perfil.usuario.remedio_continuo ? `${perfil.usuario.remedio_continuo}` : prev.remedio_continuo,
                    }));    
                }
            }
            catch (error) {
                console.error("Erro ao carregar as informações adicionais do perfil: ", error);
            };
        }

        carregarInformacoesAdicionais()

    }, []);

    function formatarDataPtBr(dataISO){
        const data = new Date(dataISO);

        const dataFormatada = data.toLocaleDateString('pt-BR', {
            timeZone: "UTC",
        });

        return dataFormatada;
    }

    function showModalButtons() {
        setModalButtons(true);
    }

    function showModalForm() {
        setModalForm(true);
    }

    function fazerLogout() {
        if (logout) logout(); // Verificação se logout existe
        navigate("/login", {replace: true});
    }

    function redirectToHome() {
        navigate("/", {replace: true});
    }

    const handleChangeAdditionalInfo = (e) => {
        let { name, value } = e.target;

        // Converte vírgula para ponto para campos numéricos decimais
        if (name === "altura" || name === "peso") {
            value = value.replace(",", ".");
        }
        setAdditionalInfo((prev) => ({ ...prev, [name]: value }));
    };

    async function handleAdditionalInfoSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Autenticação necessária.");
            navigate("/login");
            return;
        }

        if (!usuario || !usuario.id) {
            alert(
                "ID do usuário não encontrado. Por favor, faça login novamente."
            );
            // Redirecionar para a página de login
            return;
        }

        // O ID do usuário é obtido pelo backend a partir do token, não é mais necessário enviar no payload.
        const payload = { ...additionalInfo };

        try {
            const result = await atualizarInfoPerfil(payload, token);
            if (
                result.mensagem ===
                "Informações de perfil atualizadas com sucesso!"
            ) {
                alert(result.mensagem);
                setModalForm(false);
                // Atualizar os dados do usuário no AuthContext para refletir imediatamente na UI
                const perfilAtualizadoResponse = await buscarPerfil(token);
                if (perfilAtualizadoResponse.usuario) {
                    window.location.reload();
                } else {
                    console.error(
                        "Não foi possível buscar o perfil atualizado após a atualização."
                    );
                    // Opcional: Adicionar uma mensagem para o usuário ou tentar novamente.
                }
            } else {
                alert(result.mensagem || "Erro ao atualizar informações.");
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert(
                "Erro na requisição: " +
                    (error.message || "Erro desconhecido ao atualizar perfil.")
            );
        }
    }

    return (
        <div id="profile_container">
            <Background imageUrl={FundoLaranja} />

            <header id="profile_box">
                <Button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={redirectToHome}
                >
                    <img src={BackButton} height={35} width={35} alt="Voltar" />
                </Button>
            </header>

            <div id="profile_container_wrapper">
                <div id="main_content_container">
                    <main id="informations_container">
                        <div id="avatar">
                            <img src={GatoIcon} alt="Avatar" />
                        </div>
                        <div id="informations_profile">
                            <h2 className="text-capitalize">{usuario?.nome}</h2>
                            <div id="informations">
                                <span>Email: {usuario?.email}</span>
                                <span>Telefone: {usuario?.telefone || "Não informado"}</span>   
                                <span>
                                    Matrícula: 00{usuario?.id || ""}
                                </span>
                                <span>
                                    Data de Nascimento:{" "}
                                    {additionalInfo.data_nascimento || ""}
                                </span>
                            </div>
                            <Button>
                                <img src={ButtonEdit} alt="Editar" />
                            </Button>
                        </div>
                    </main>

                    <section className="redirect-section">
                        <h3>Redirecionamento</h3>
                        <Button
                            className={"redirect_profile_buttons"}
                            onClick={redirectToHome}
                        >
                            INÍCIO
                        </Button>
                        <Button
                            className={"redirect_profile_buttons"}
                            onClick={() => {
                                navigate("/historico", {replace: true});
                            }}
                        >
                            HISTÓRICO
                        </Button>
                        <Button
                            className={"redirect_profile_buttons"}
                            onClick={showModalButtons}
                        >
                            AGENDAMENTO
                        </Button>
                        <Button
                            className={"redirect_profile_buttons"}
                            onClick={fazerLogout}
                        >
                            SAIR
                        </Button>
                    </section>
                </div>

                <aside id="profile_aside">
                    <h2>INFORMAÇÕES ADICIONAIS</h2>
                    <p>Altura: {additionalInfo.altura ? additionalInfo.altura + " m" : "Não existe"}</p>
                    <p>Peso: {additionalInfo.peso ? additionalInfo.peso + " kg" : "Não existe"}</p>
                    <p>Tipo sanguíneo: {additionalInfo.tipo_sanguineo || "Não existe"}</p>
                    <p>Alergias conhecidas: {additionalInfo.alergias_conhecidas || "Não existe"}</p>
                    <p>Remédio contínuo: {additionalInfo.remedio_continuo || "Não existe"}</p>

                    <Button onClick={showModalForm}>EDITAR FICHA</Button>
                </aside>

                <Modal
                    show={modalForm}
                    onHide={() => {
                        setModalForm(false);
                    }}
                >
                    <Modal.Header
                        closeButton
                        style={{ fontFamily: "Passion One" }}
                    >
                        <h2>Complete as informações</h2>
                    </Modal.Header>
                    <form onSubmit={handleAdditionalInfoSubmit}>
                        <Modal.Body>
                            <div id="two_inputs">
                                <FormInputSchedule
                                    name={"altura"}
                                    label={"Altura:"}
                                    type={"text"}
                                    placeholder={"Ex: 1.75"}
                                    value={additionalInfo.altura}
                                    onChange={handleChangeAdditionalInfo}
                                />
                                <FormInputSchedule
                                    name={"peso"}
                                    label={"Peso:"}
                                    type={"text"}
                                    placeholder={"Ex: 70.5"}
                                    value={additionalInfo.peso}
                                    onChange={handleChangeAdditionalInfo}
                                />
                            </div>
                            <FormInputSchedule
                                name={"tipo_sanguineo"}
                                label={"Tipo Sanguíneo:"}
                                type={"select"}
                                options={Dados.tiposSanguineos}
                                value={additionalInfo.tipo_sanguineo}
                                onChange={handleChangeAdditionalInfo}
                            />
                            <FormInputSchedule
                                name={"alergias_conhecidas"}
                                label={"Alergias Conhecidas:"}
                                type={"textarea"}
                                rows={2}
                                value={additionalInfo.alergias_conhecidas}
                                onChange={handleChangeAdditionalInfo}
                            />
                            <FormInputSchedule
                                name={"remedio_continuo"}
                                label={"Remedio Contínuo:"}
                                type={"textarea"}
                                rows={2}
                                value={additionalInfo.remedio_continuo}
                                onChange={handleChangeAdditionalInfo}
                            />
                        </Modal.Body>
                        <Modal.Footer
                            style={{
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                text={"PROSSEGUIR"}
                                type={"submit"}
                                style={{
                                    backgroundColor: "#043C40",
                                    border: "none",
                                    borderRadius: 37.5,
                                    fontFamily: "Passion One",
                                    fontSize: "1.5em",
                                    width: "50%",
                                }}
                            />
                        </Modal.Footer>
                    </form>
                </Modal>

                <ScheduleButtons
                    modalButtons={modalButtons}
                    setModalButtons={setModalButtons}
                />
            </div>
        </div>
    );
}
