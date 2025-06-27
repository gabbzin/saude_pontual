import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import { cadastrarConsultaPet } from "../../../api/api"; // Verifique se o caminho para seu api.js está correto

// Assets
import BackButton from "../../assets/back_button.png";

// Components
import Button from "../../components/Button";
import FormInputSchedule from "../../components/FormInputSchedule";
import Dados from "../../dados.json"; // Usado para as opções

// Styles
import "../../styles/fichas.css";

export default function FichaPessoa() {
    const navigate = useNavigate();

    // --- 1. ESTADO ADAPTADO PARA TODOS OS CAMPOS DE ANIMAL ---
    const [formData, setFormData] = useState({
        nome: "",
        especie: "",
        raca: "",
        sexo: "",
        esterilizacao: "",
        cor: "",
        peso: "",
        identificacao: "",
        data: "", // Data e hora separados para os inputs
        horario: "",
        historico_de_saude: "",
        motivo: "",
    });

    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    // --- 2. LÓGICA DE MANIPULAÇÃO E ENVIO (ADAPTADA) ---
    function handleChange(e) {
        let { name, value } = e.target;
        if (name === "peso") {
            value = value.replace(",", ".");
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        for (const campo in formData) {
            if (campo !== 'identificacao' && formData[campo].trim() === "") {
                const nomeAmigavel = campo.replace(/_/g, " ");
                setErro(`O campo '${nomeAmigavel}' é obrigatório.`);
                return;
            }
        }
        setLoading(true);
        const dataHoraCompleta = `${formData.data}T${formData.horario}`;
        try {
            const dadosParaApi = {
                nome_pet: formData.nome,
                especie: formData.especie,
                raca: formData.raca,
                sexo: formData.sexo,
                esterilizacao: formData.esterilizacao,
                cor: formData.cor,
                peso_pet: formData.peso,
                identificacao_pet: formData.identificacao,
                historico_saude_pet: formData.historico_de_saude,
                motivo_consulta_pet: formData.motivo,
                data_e_hora: dataHoraCompleta,
            };
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3001/api/pet/fichapet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dadosParaApi),
            });
            const text = await res.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (jsonErr) {
                setErro(`Erro HTTP ${res.status}: ${text}`);
                setLoading(false);
                return;
            }
            if (result.consultaPet) {
                alert("Consulta para o seu pet agendada com sucesso!");
                navigate("/");
            } else {
                setErro(result.mensagem || result.error || JSON.stringify(result) || "Erro ao agendar a consulta.");
            }
        } catch (error) {
            setErro("Falha na comunicação com o servidor: " + (error?.message || error));
        } finally {
            setLoading(false);
        }
    }

    // Função para checar se todos os campos obrigatórios estão preenchidos
    function camposObrigatoriosPreenchidos() {
        // identificacao é opcional
        return Object.entries(formData).every(([campo, valor]) =>
            campo === 'identificacao' ? true : valor.trim() !== ''
        );
    }

    return (
        <div id="container_ficha">
            <div id="back">
                <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => navigate("/")}>
                    <img src={BackButton} width={40} height={40} alt="Voltar"/>
                </Button>
            </div>
            <main id="ficha">
                <h1>PREENCHA A FICHA DO SEU PET:</h1>

                {/* --- 3. FORMULÁRIO CONECTADO À LÓGICA --- */}
                <form onSubmit={handleSubmit}>
                    
                    <FormInputSchedule
                        id={"nome"} name={"nome"} required={true}
                        label={"Nome do Pet:"} type={"text"}
                        placeholder={"Digite o nome do pet"}
                        value={formData.nome} onChange={handleChange}
                    />
                    
                    <div id="three_inputs">
                        <FormInputSchedule
                            id={"especie"} name={"especie"} required={true}
                            label={"Espécie:"} type={"text"}
                            placeholder={"Ex: Cachorro, Gato"}
                            value={formData.especie} onChange={handleChange}
                        />
                        <FormInputSchedule
                            id={"raca"} name={"raca"} required={true}
                            label={"Raça:"} type={"text"}
                            placeholder={"Digite a raça"}
                            value={formData.raca} onChange={handleChange}
                        />
                        <FormInputSchedule
                            id={"sexo"} name={"sexo"} required={true}
                            label={"Sexo:"} type={"text"}
                            placeholder={"Ex: Macho, Fêmea"}
                            value={formData.sexo} onChange={handleChange}
                        />
                    </div>

                    <div id="three_inputs">
                        <FormInputSchedule
                            id={"esterilizacao"} name={"esterilizacao"} required={true}
                            label={"Esterilização:"} type={"text"}
                            placeholder={"Ex: Castrado"}
                            value={formData.esterilizacao} onChange={handleChange}
                        />
                        <FormInputSchedule
                            id={"cor"} name={"cor"} required={true}
                            label={"Cor:"} type={"text"}
                            placeholder={"Digite a cor"}
                            value={formData.cor} onChange={handleChange}
                        />
                        <FormInputSchedule
                            id={"peso"} name={"peso"} required={true}
                            label={"Peso (kg):"} type={"text"}
                            placeholder={"Ex: 10,5"}
                            value={formData.peso} onChange={handleChange}
                        />
                    </div>

                    <div id="three_inputs">
                        <FormInputSchedule
                            id={"data"} name={"data"} required={true}
                            label={"Data da consulta:"} type={"date"}
                            value={formData.data} onChange={handleChange}
                        />
                        <FormInputSchedule
                            id={"horario"} name={"horario"} required={true}
                            label={"Horários Disponíveis:"} type={"select"}
                            options={Dados.horarios}
                            value={formData.horario} onChange={handleChange}
                        />
                        <FormInputSchedule
                            id={"identificacao"} name={"identificacao"}
                            label={"Identificação (Opcional):"} type={"text"}
                            placeholder={"Nº do microchip, etc"}
                            value={formData.identificacao} onChange={handleChange}
                        />
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FormInputSchedule
                            id={"historico_de_saude"} name={"historico_de_saude"} required={true}
                            label={"Histórico de Saúde:"}
                            placeholder={"Alergias, vacinas, cirurgias, etc."}
                            rows={2} type={"textarea"}
                            value={formData.historico_de_saude} onChange={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FormInputSchedule
                            id={"motivo"} name={"motivo"} required={true}
                            label={"Motivo da Consulta:"}
                            placeholder={"Digite o motivo da consulta"}
                            rows={2} type={"textarea"}
                            value={formData.motivo} onChange={handleChange}
                        />
                    </div>

                    {erro && <p className="text-danger mt-3 text-center">{erro}</p>}

                    <div id="container_button_submit">
                        <Button
                            type={"submit"}
                            disabled={!camposObrigatoriosPreenchidos() || loading}
                            style={{
                                backgroundColor: "#043C40",
                                border: "None",
                                borderRadius: 37.5,
                                fontFamily: "Passion One",
                                fontSize: "1.5em",
                                width: "50%",
                                opacity: camposObrigatoriosPreenchidos() && !loading ? 1 : 0.5,
                                cursor: camposObrigatoriosPreenchidos() && !loading ? "pointer" : "not-allowed"
                            }}
                        >
                            {loading ? "AGENDANDO..." : "AGENDAR CONSULTA"}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}