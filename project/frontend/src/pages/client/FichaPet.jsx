import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import { cadastrarConsulta } from "../../../api/api"; // Verifique se o caminho para seu api.js está correto

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
        area_medica_desejada: "", // Adicionado, pois é necessário para a lógica
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
            // O campo 'identificacao' pode ser opcional
            if (campo !== 'identificacao' && formData[campo].trim() === "") {
                const nomeAmigavel = campo.replace(/_/g, " ");
                setErro(`O campo '${nomeAmigavel}' é obrigatório.`);
                return;
            }
        }
        
        setLoading(true);

        const dataHoraCompleta = `${formData.data}T${formData.horario}`;

        try {
            // Monta o objeto com todos os dados do formulário para enviar à API
            const dadosParaApi = {
                ...formData,
                data_e_hora: dataHoraCompleta,
            };
            // Remove os campos de data e horario que foram combinados
            delete dadosParaApi.data;
            delete dadosParaApi.horario;

            const result = await cadastrarConsulta(dadosParaApi);
            
            if (result.consulta) {
                alert("Consulta para o seu pet agendada com sucesso!");
                navigate("/");
            } else {
                setErro(result.mensagem || "Erro ao agendar a consulta.");
            }

        } catch (error) {
            console.error("Erro na requisição:", error)
            setErro("Falha na comunicação com o servidor.");
        } finally {
            setLoading(false);
        }
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
                    
                    <FormInputSchedule
                        id={"area_medica_desejada"} name={"area_medica_desejada"} required={true}
                        label={"Área Médica Desejada:"} type={"select"}
                        options={Dados.areasMedicas}
                        value={formData.area_medica_desejada} onChange={handleChange}
                    />

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
                            text={loading ? "AGENDANDO..." : "AGENDAR CONSULTA"}
                            type={"submit"}
                            disabled={loading}
                            style={{ /* Estilos do botão */ }}
                        />
                    </div>
                </form>
            </main>
        </div>
    );
}