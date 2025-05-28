import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, ModalFooter } from "react-bootstrap";
import Dados from "../dados.json";
// Assets
import BackButton from "../assets/back_button.png";
import ButtonEdit from "../assets/button_edit.png";
import FundoLaranja from "../assets/background_orange.jpg";
import GatoIcon from "../assets/gato_icon.jpeg";
import ProfileIcon from "../assets/profile_icon.png";
// Componentes
import Background from "../components/Background";
import Button from "../components/Button";
import FormInputSchedule from "../components/FormInputSchedule";
import ScheduleButtons from "../components/ScheduleButtons";
// Styles
import "../styles/perfil.css";

export default function Perfil() {
    const { usuario, logout } = useContext(AuthContext); // Simplificado

    const [modalButtons, setModalButtons] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const navigate = useNavigate();

    function showModalButtons() {
        setModalButtons(true);
    }

    function showModalForm() {
        setModalForm(true);
    }

    function fazerLogout() {
        if (logout) logout(); // Verificação se logout existe
        navigate("/login");
    }

    function redirectToHome() {
        navigate("/");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // try {
        //     const result = await cadastrarConsulta({
        //         ...formData,
        //         data_e_hora: dataHoraCompleta,
        //     });

        //     if (result.mensagem) {
        //         alert(result.mensagem);
        //         navigate("/"); // Navega para a home (ou onde quiser)
        //     } else {
        //         alert("Erro ao cadastrar a consulta");
        //     }
        // } catch (error) {
        //     alert("Erro na requisição: " + error.message);
        // }
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
                            <h2>{usuario?.nome}</h2>
                            <div id="informations">
                                <span>
                                    Email:{" "}
                                    {usuario?.email ||
                                        "thalita12hufdhus@gmail.com"}
                                </span>
                                <span>
                                    Telefone:{" "}
                                    {usuario?.telefone || "(61) 4002-8922"}
                                </span>
                                <span>
                                    Matrícula: {usuario?.matricula || "0021598"}
                                </span>
                                <span>
                                    Data de Nascimento:{" "}
                                    {usuario?.dataNascimento || "15/05/1998"}
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
                        <Button className={"redirect_profile_buttons"}>
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
                    <p>Altura: {/* Preencha este campo */}</p>
                    <p>Peso: {/* Preencha este campo */}</p>
                    <p>Tipo sanguíneo: {/* Preencha este campo */}</p>
                    <p>Alergias conhecidas: {/* Preencha este campo */}</p>
                    <p>Remédio contínuo: {/* Preencha este campo */}</p>

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
                    <form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <div id="two_inputs">
                                <FormInputSchedule
                                    name={"altura_profile"}
                                    label={"Altura:"}
                                    type={"text"}
                                />
                                <FormInputSchedule
                                    name={"peso_profile"}
                                    label={"Peso:"}
                                    type={"text"}
                                />
                            </div>
                            <FormInputSchedule
                                name={"tipo_sanguineo_profile"}
                                label={"Tipo Sanguíneo:"}
                                type={"select"}
                                options={Dados.tiposSanguineos}
                            />
                            <FormInputSchedule
                                name={"alergias_profile"}
                                label={"Alergias Conhecidas:"}
                                type={"textarea"}
                                rows={2}
                            />
                            <FormInputSchedule
                                name={"remedio_continuo_profile"}
                                label={"Remedio Contínuo:"}
                                type={"textarea"}
                                rows={2}
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
