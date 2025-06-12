import { useNavigate } from "react-router-dom";
// Assets
import BackButton from "../../assets/back_button.png";
import FundoVerde from "../../assets/background_green.jpg";
// Components
import Background from "../../components/Background";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import FormInputS from "../../components/FormInputSchedule";
// Styles
import "./homeadm.css";
import Dados from "../../dados.json";

export default function HomeAdm() {
    const navigate = useNavigate();

    return (
        <>
            <Background imageUrl={FundoVerde} />
            <div id="back">
                <Button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                    onClick={() => {
                        navigate("/loginadm");
                    }}
                >
                    <img src={BackButton} width={40} height={40} />
                </Button>
            </div>
            <main id="container-adm-wrapper">
                <section id="cadastrar-profissional">
                    <h2>Cadastrar Profissional</h2>
                    <form>
                        <FormInput
                            id="nome"
                            name="nome"
                            label="Nome"
                            type="text"
                            placeholder="Digite o nome"
                            required={true}
                        />
                        <FormInput
                            id="area"
                            name="area"
                            type="select"
                            label="Área Médica"
                            options={Dados.areasMedicas}
                            placeholder="Digite a área de atuação"
                            required={true}
                        />
                        <FormInput
                            id="nascimento"
                            name="nascimento"
                            label="Data de Nascimento"
                            type="date"
                            placeholder="Digite a data de nascimento"
                            required={true}
                        />
                        <FormInput
                            id="telefone"
                            name="telefone"
                            label="Telefone"
                            type="tel"
                            placeholder="Digite o telefone"
                            required={true}
                        />
                        <FormInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Digite o email"
                            required={true}
                        />
                        <FormInput
                            id="crm"
                            name="crm"
                            label="CRM"
                            type="text"
                            placeholder="Digite o CRM"
                            required={true}
                        />
                        <FormInput
                            id="senha"
                            name="senha"
                            label="Senha"
                            type="password"
                            placeholder="Digite a senha"
                            required={true}
                        />
                    </form>

                    <Button
                        onClick={console.log("Cadastrando user")}
                        style={{
                            padding: 16,
                            margin: 8,
                            fontSize: "1.7em",
                            width: 200,
                            borderRadius: 75,
                            border: "none",
                            backgroundColor: "#003C39",
                            fontFamily: "Passion One",
                        }}
                    >
                        Cadastrar
                    </Button>
                </section>

                <h1 id="plataform-name">
                    Saude
                    <br />
                    Pontual
                </h1>
                <section id="buscar-usuarios">
                    <div>
                        <h2 id="title-buscar-usuarios">Buscar Usuarios</h2>
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
                    <div id="button-actions-adm">
                        <Button id="action-button-adm">
                            Deletar
                        </Button>
                        <Button id="action-button-adm">
                            Editar
                        </Button>
                    </div>
                </section>
            </main>
        </>
    );
}
