import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cadastrarProfissional } from "../../../api/api";
// Assets
import BackButton from "../../assets/back_button.png";
import FundoVerde from "../../assets/background_green.jpg";
// Components
import Background from "../../components/Background";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
// Styles
import "./homeadm.css";
import Dados from "../../dados.json";

export default function HomeAdm() {
    const navigate = useNavigate();

    const [showModalProEdit, setShowModalProEdit] = useState(false);
    const [showModalClientEdit, setShowModalClientEdit] = useState(false);

    // Estado para os campos do formulário de cadastro de profissional
    const [form, setForm] = useState({
        nome: "",
        area: "",
        telefone: "",
        email: "",
        crm: "",
        senha: ""
    });
    const [cadastroMsg, setCadastroMsg] = useState("");
    const [cadastroErro, setCadastroErro] = useState("");

    // Atualiza campo do formulário
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Submete cadastro de profissional
    async function handleSubmit(e) {
        e.preventDefault();
        setCadastroMsg("");
        setCadastroErro("");
        try {
            // Limpa o telefone para conter apenas dígitos
            const telefoneLimpo = form.telefone.replace(/\D/g, "");
            const result = await cadastrarProfissional({
                nome: form.nome,
                especialidade: form.area,
                crm: form.crm,
                email: form.email,
                senha: form.senha,
                telefone: telefoneLimpo
            });
            if (result.profissional) {
                setCadastroMsg("Profissional cadastrado com sucesso!");
                setForm({ nome: "", area: "", telefone: "", email: "", crm: "", senha: "" });
            } else {
                setCadastroErro(result.mensagem || "Erro ao cadastrar profissional");
            }
        } catch (err) {
            setCadastroErro("Erro ao cadastrar profissional");
        }
    }

    function showModalPro() {
        setShowModalProEdit(true);
    }



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
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            id="nome"
                            name="nome"
                            label="Nome"
                            type="text"
                            placeholder="Digite o nome"
                            required={true}
                            value={form.nome}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="area"
                            name="area"
                            type="select"
                            label="Área Médica"
                            options={Dados.areasMedicas}
                            placeholder="Digite a área de atuação"
                            required={true}
                            value={form.area}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="nascimento"
                            name="nascimento"
                            label="Data de Nascimento"
                            type="date"
                            placeholder="Digite a data de nascimento"
                            required={true}
                            value={form.nascimento}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="telefone"
                            name="telefone"
                            label="Telefone"
                            type="tel"
                            placeholder="Digite o telefone (com DDD)"
                            required={true}
                            value={form.telefone}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Digite o email"
                            required={true}
                            value={form.email}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="crm"
                            name="crm"
                            label="CRM"
                            type=""
                            placeholder="Digite o CRM"
                            required={true}
                            value={form.crm}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="senha"
                            name="senha"
                            label="Senha"
                            type="password"
                            placeholder="Digite a senha"
                            required={true}
                            value={form.senha}
                            onChange={handleChange}
                        />
                        <Button
                            id={"botao-cadastrar-adm"}
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                    </form>
                    {cadastroMsg && <p className="text-success">{cadastroMsg}</p>}
                    {cadastroErro && <p className="text-danger">{cadastroErro}</p>}
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
                        <Button id="action-button-adm">Deletar</Button>
                        <Button id="action-button-adm" onClick={showModalPro}>
                            Editar
                        </Button>
                    </div>
                </section>
            </main>
            <Modal
                show={showModalProEdit}
                onHide={() => setShowModalProEdit(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    style={{
                        color: "#004D3E",
                        fontFamily: "Passion One",
                        fontSize: "2em",
                        justifyContent: "center",
                    }}
                >
                    <h2 style={{ margin: "auto", position: "absolute" }}>
                        Editar Cadastro
                    </h2>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
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
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button id={"button-confirm-edit"}>Confirmar Edição</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showModalClientEdit}
                onHide={() => setShowModalClientEdit(false)}
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
                    <h2>Editar Cadastro</h2>
                </Modal.Header>
                <Modal.Body>
                    <FormInput
                        id="nome"
                        name="nome"
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome"
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
                        id="senha"
                        name="senha"
                        label="Senha"
                        type="password"
                        placeholder="Digite a senha"
                        required={true}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button id={"button-confirm-edit"}>Confirmar Edição</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
