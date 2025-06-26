import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
    cadastrarProfissional,
    listarTodosUsuarios,
    deletarProfissional,
} from "../../../api/api";

// Assets, Components, Styles
import BackButton from "../../assets/back_button.png";
import FundoVerde from "../../assets/background_green.jpg";
import Background from "../../components/Background";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Dados from "../../dados.json"; // Usado no formulário
import "./homeadm.css";

export default function HomeAdm() {
    const navigate = useNavigate();

    // --- ESTADOS PARA O CADASTRO DE PROFISSIONAL ---
    const [form, setForm] = useState({
        nome: "",
        area: "",
        telefone: "",
        email: "",
        crm: "",
        senha: "",
    });
    const [cadastroMsg, setCadastroMsg] = useState("");
    const [cadastroErro, setCadastroErro] = useState("");

    // --- ESTADOS PARA A BUSCA E GERENCIAMENTO DE USUÁRIOS ---
    const [loading, setLoading] = useState(false);
    const [todosUsuarios, setTodosUsuarios] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    // --- ESTADOS DOS MODAIS ---
    const [showModalProEdit, setShowModalProEdit] = useState(false);
    // const [showModalClientEdit, setShowModalClientEdit] = useState(false); // Descomente se for usar

    // --- LÓGICA DE CADASTRO (EXISTENTE) ---
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setCadastroMsg("");
        setCadastroErro("");
        setLoading(true);
        try {
            const telefoneLimpo = form.telefone.replace(/\D/g, "");
            const result = await cadastrarProfissional({
                nome: form.nome,
                especialidade: form.area,
                crm: form.crm,
                email: form.email,
                senha: form.senha,
                telefone: telefoneLimpo,
            });
            if (result.profissional) {
                setCadastroMsg("Profissional cadastrado com sucesso!");
                setForm({
                    nome: "",
                    area: "",
                    telefone: "",
                    email: "",
                    crm: "",
                    senha: "",
                });
                // Atualiza a lista de usuários para incluir o novo profissional
                setTodosUsuarios((prev) => [...prev, result.profissional]);
            } else {
                setCadastroErro(
                    result.mensagem || "Erro ao cadastrar profissional"
                );
            }
        } catch (err) {
            setCadastroErro("Erro ao cadastrar profissional");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // --- LÓGICA DE BUSCA E GERENCIAMENTO ---

    // Busca todos os usuários quando a página carrega
    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const data = await listarTodosUsuarios();
                if (data.usuarios) {
                    setTodosUsuarios(data.usuarios);
                } else {
                    setCadastroErro(
                        "Nenhum usuário encontrado ou falha ao buscar."
                    );
                }
            } catch (err) {
                console.error("Erro ao buscar usuários", err);
                setCadastroErro("Erro de rede ao buscar usuários.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    // Filtra os usuários conforme o admin digita
    const usuariosFiltrados = useMemo(() => {
        if (!termoBusca) {
            return todosUsuarios;
        }
        return todosUsuarios.filter(
            (user) =>
                user.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                user.email.toLowerCase().includes(termoBusca.toLowerCase())
        );
    }, [termoBusca, todosUsuarios]);

    // Lógica para deletar um usuário
    const handleDeletarUsuario = async () => {
        if (!usuarioSelecionado) return;

        if (
            window.confirm(
                `Tem certeza que deseja deletar o usuário ${usuarioSelecionado.nome}? Esta ação não pode ser desfeita.`
            )
        ) {
            setLoading(true);
            try {
                const result = await deletarProfissional(usuarioSelecionado.id);
                if (result.sucesso) {
                    setTodosUsuarios((prev) =>
                        prev.filter((user) => user.id !== usuarioSelecionado.id)
                    );
                    setUsuarioSelecionado(null);
                    alert("Usuário deletado com sucesso.");
                } else {
                    alert(result.message || "Erro ao deletar usuário.");
                }
            } catch (err) {
                alert("Erro na requisição para deletar usuário.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Lógica para abrir o modal de edição
    const handleEditarUsuario = () => {
        if (!usuarioSelecionado) return;
        // Futuramente, você pode pré-preencher um formulário de edição aqui.
        if (usuarioSelecionado.crm) {
            setShowModalProEdit(true);
        } else {
            alert("A edição de cliente ainda não foi implementada.");
            // setShowModalClientEdit(true);
        }
    };

    return (
        <>
            <Background imageUrl={FundoVerde} />
            <div id="back">
                <Button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() => navigate("/loginadm")}
                >
                    <img src={BackButton} width={40} height={40} alt="Voltar" />
                </Button>
            </div>
            <main id="container-adm-wrapper">
                <section id="cadastrar-profissional">
                    <h2>Cadastrar Profissional</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Seus FormInputs para cadastro aqui... */}
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
                            type="text"
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
                            disabled={loading}
                        >
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </form>
                    {cadastroMsg && (
                        <p className="text-success mt-2">{cadastroMsg}</p>
                    )}
                    {cadastroErro && (
                        <p className="text-danger mt-2">{cadastroErro}</p>
                    )}
                </section>

                <h1 id="plataform-name">
                    Saude
                    <br />
                    Pontual
                </h1>

                <section id="buscar-usuarios">
                    <div>
                        <h2 id="title-buscar-usuarios">Gerenciar Usuários</h2>
                        <div className="pesquisar_pacientes mt-4">
                            <input
                                type="text"
                                className="input_pesquisar_pacientes"
                                placeholder="PESQUISAR POR NOME OU EMAIL"
                                value={termoBusca}
                                onChange={(e) => {
                                    setTermoBusca(e.target.value);
                                    setUsuarioSelecionado(null); // Limpa a seleção ao pesquisar
                                }}
                            />
                        </div>
                    </div>

                    <div className="lista-usuarios-container mt-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && todosUsuarios.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Carregando...
                                        </td>
                                    </tr>
                                )}
                                {!loading && usuariosFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Nenhum usuário encontrado.
                                        </td>
                                    </tr>
                                )}
                                {usuariosFiltrados.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() =>
                                            setUsuarioSelecionado(user)
                                        }
                                        className={
                                            usuarioSelecionado?.id === user.id
                                                ? "table-active"
                                                : ""
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.crm
                                                ? "Profissional"
                                                : "Paciente"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div id="button-actions-adm">
                        <Button
                            id="action-button-adm"
                            onClick={handleDeletarUsuario}
                            disabled={
                                !usuarioSelecionado ||
                                loading ||
                                !usuarioSelecionado.crm
                            }
                        >
                            Deletar Profissional
                        </Button>
                        <Button
                            id="action-button-adm"
                            onClick={handleEditarUsuario}
                            disabled={
                                !usuarioSelecionado ||
                                loading ||
                                !usuarioSelecionado.crm
                            }
                        >
                            Editar Profissional
                        </Button>
                    </div>
                </section>
            </main>

            {/* O Modal para editar profissional */}
            <Modal
                show={showModalProEdit}
                onHide={() => setShowModalProEdit(false)}
                centered
            >
                {/* ... conteúdo do seu modal de edição ... */}
                <Modal.Header closeButton style={{ justifyContent: "center" }}>
                    <h2 style={{ margin: "auto", position: "absolute" }}>
                        Editar Profissional
                    </h2>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <form action=""></form>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button id={"button-confirm-edit"}>Confirmar Edição</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
