// Assets
import Logo from "../../assets/logo_saude_pontual.png";
import ProfileIcon from "../../assets/profile_icon.png";
// Components
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
import FormInputSchedule from "../../components/FormInputSchedule";
// Styles
import "../../styles/calendario.css";
import "../../styles/homepro.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePro() {
    return (
        <div id="pro_container_home">
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
                    <h3>Selecionar paciente</h3>
                    <div className="pesquisar_pacientes">
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
                    <textarea name="relatorio_write" id="relatorio_write" rows={15} placeholder="Escrever relatório">

                    </textarea>
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
                    <div id="calendar_pro" style={{ height: "75%" }}>
                        <Calendar />
                    </div>
                    <div id="historico_relatorios">
                        <Button className={"button_homepro_page"} id="historico_e_relatorio">
                            Histórico e Relatórios
                        </Button>
                    </div>
                </section>
                <section id="ficha_pacientes">
                    <h2>Ficha de Pacientes</h2>
                    <div className="pesquisar_pacientes">
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
