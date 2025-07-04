import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../../api/api";
// Assets
import FundoVerde from "../../assets/background_green.jpg";
import Logo from "../../assets/logo_saude_pontual.png";
// Components
import Background from "../../components/Background"; // Importação do Background
import Button from "../../components/Button"; // Importação do Button
import FormInput from "../../components/FormInput"; // Importação do Input
import MoModal from "../../components/MoModal"; // Importação do Modal
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/login_cadastro.css";

export default function Cadastro() {
    
    function getDataHojeLocal() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    const dataAtual = getDataHojeLocal();

    const estiloModalPadrao = {
        fontFamily: "Passion One",
        fontWeight: 400,
        fontSize: "1.7em",
        textAlign: "center",
    };

    const [form, setForm] = useState({
        nome: "",
        data_nascimento: "",
        telefone: "",
        email: "",
        senha: "",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [msgError, setmsgError] = useState("");
    const [modalErrorSignUp, setModalErrorSignUp] = useState(false);
    const navigate = useNavigate();

    // Atualiza campo do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    function showModalVisible() {
        setModalVisible(true);
    }

    // Envia dados para o cadastro
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await cadastrarUsuario(form);

            if (result.usuario) {
                showModalVisible();

                setTimeout(() => {
                    setModalVisible(false);
                    navigate("/login");
                }, 2000);
            } else {
                setmsgError(result.mensagem || "Erro ao cadastrar");
                setModalErrorSignUp(true);
            }
        } catch (err) {
            setmsgError(err.message || "Erro ao cadastrar");
            setModalErrorSignUp(true);
        }
    };

    return (
        <div id="background" className="d-flex align-items-center">
            <Background imageUrl={FundoVerde} />
            <img
                src={Logo}
                alt="Foto da empresa"
                width={75}
                height={75}
                className="position-absolute top-0"
                style={{
                    marginTop: 10,
                    marginLeft: 15,
                }}
            />
            <main className="form-signin w-100 m-auto d-flex flex-column align-items-center py-2">
                <h1 id="title" className="mb-3 fw-normal">
                    SAÚDE PONTUAL
                </h1>
                <div
                    id="box-form"
                    className="flex justify-content-center align-items-center p-3"
                >
                    <form onSubmit={handleSubmit}>
                        {/* Campo de nome */}
                        <FormInput
                            id="floatingName"
                            name="nome"
                            label="Nome"
                            type="text"
                            value={form.nome}
                            onChange={handleChange}
                            required={true}
                            iconrequired={"*"}
                        />
                        {/* Campo de Data de Nascimento */}
                        <FormInput
                            id="floatingDateOfBirth"
                            name="data_nascimento"
                            label="Data de Nascimento"
                            type="date"
                            value={form.data_nascimento}
                            onChange={handleChange}
                            required={true}
                            iconrequired={"*"}
                            max={dataAtual} // Impede datas futuras
                        />
                        {/* Campo de Telefone */}
                        <FormInput
                            id="floatingPhoneNumber"
                            name="telefone"
                            label="Telefone (Somente números)"
                            type="tel"
                            value={form.telefone}
                            onChange={handleChange}
                            required={false}
                            minLength={11}
                            maxLength={11}
                        />
                        {/* Campo de e-mail */}
                        <FormInput
                            id="floatingInput"
                            name="email"
                            label="E-mail"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required={true}
                            iconrequired={"*"}
                        />
                        {/* Campo de Senha */}
                        <FormInput
                            id="floatingPassword"
                            name="senha"
                            label="Senha"
                            type="password"
                            value={form.senha}
                            onChange={handleChange}
                            required={true}
                            iconrequired={"*"}
                        />

                        {/* Botão de Cadastro */}
                        <div id="botao" className="flex text-center w-100">
                            <Button
                                id={"login-button"}
                                text={"CADASTRAR"}
                                type="submit"
                                style={{
                                    padding: 16,
                                    margin: 8,
                                    fontSize: "1.5em",
                                    width: 150,
                                    borderRadius: 75,
                                    border: "None",
                                }}
                            />
                        </div>

                        {/* Redirecionamento para fazer cadastro */}
                        <div id="link" className="mt-1 text-center text-white">
                            Já tem uma conta?{" "}
                            <Link
                                to="/login"
                                className="fw-bold text-decoration-none text-white"
                            >
                                Fazer login
                            </Link>
                        </div>
                    </form>
                </div>
                <MoModal // Sucesso ao cadastrar
                    show={modalVisible}
                    onClose={() => setModalVisible(false)}
                    text={"Cadastro \n Finalizado"}
                    styleBody={estiloModalPadrao}
                />

                <MoModal // Erro ao cadastrar
                    show={modalErrorSignUp}
                    onClose={() => setModalErrorSignUp(false)}
                    text={msgError}
                    styleBody={{ ...estiloModalPadrao, color: "#F00" }}
                />
            </main>
        </div>
    );
}
