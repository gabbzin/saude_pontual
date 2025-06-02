// Assets
import Logo from "../../assets/logo_saude_pontual.png";
import ProfileIcon from "../../assets/profile_icon.png";
// Components
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
import FormInputSchedule from "../../components/FormInputSchedule";
// Styles
import "../../styles/calendario.css";

export default function HomePro() {
    return (
        <div id="pro_container_home">
            <header id="pro_home">
                <div id="rebranding">
                    <img src={Logo} id="logo_pro_home" />
                    <h2 id="title_pro_home">Saúde Pontual</h2>
                </div>
                <div id="profilepro">
                    <img src={ProfileIcon} id="icon_pro_home" />
                    <h3>Dra. {"Júlia"}</h3>
                </div>
            </header>
            <main id="pro_home_wrapper">
                <section id="writer_relatorio">
                    <h3>Selecionar paciente</h3>
                    <div className="pesquisar_pacientes">
                        <input
                            type="text"
                            className="input_pesquisar_pacientes"
                            placeholder="PESQUISAR"
                        />
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                class="bi bi-search"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                    <FormInputSchedule
                        placeholder={"Escrever relatório"}
                        id={"relatorio_write"}
                        rows={8}
                    />
                    <Button
                        className={"button_homepro_page"}
                        type={"submit"}
                        onClick={() => {
                            console.log("Enviando relatório");
                        }}
                    >
                        ENVIAR
                    </Button>
                </section>
                <section id="calendar_history_section">
                    <div id="calendar_pro" style={{ height: "100%" }}>
                        <Calendar />
                    </div>
                    <div id="historico_relatorios">
                        <Button className={"button_homepro_page"}>
                            Histórico e Relatórios
                        </Button>
                    </div>
                </section>
                <section id="ficha_pacientes">
                    <div className="pesquisar_pacientes">
                        <input
                            type="text"
                            className="input_pesquisar_pacientes"
                            placeholder="PESQUISAR"
                        />
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                class="bi bi-search"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
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
