import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarConsulta } from "../../../api/api";
// Components
import Button from "../../components/Button";
import FormInputSchedule from "../../components/FormInputSchedule";
import BackButton from "../../assets/back_button.png";
import MoModal from "../../components/MoModal";

import Dados from "../../dados.json";

import "../../styles/fichas.css";

export default function FichaPessoa() {
    function getDataHojeLocal() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    const dataAtual = getDataHojeLocal();

    const [formData, setFormData] = useState({
        nome: "",
        peso: "",
        altura: "",
        tipo_sanguineo: "",
        historico_de_saude: "",
        area_medica_desejada: "",
        horario: "",
        data_e_hora: "", // Para data + hora combinadas
        motivo: "",
    });
    const [erro, setErro] = useState("");
    const [tentouSubmit, setTentouSubmit] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState("success"); // "success" ou "error"

    const navigate = useNavigate();

    function handleChange(e) {
        let { name, value } = e.target;
        if(name === "peso" || name === "altura"){
            value = value.replace(",", ".");
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Limpa erro ao corrigir campo
        if (tentouSubmit) {
            setErro("");
        }
    }

    function validarCampos() {
        const obrigatorios = [
            "nome",
            "peso",
            "altura",
            "tipo_sanguineo",
            "historico_de_saude",
            "area_medica_desejada",
            "motivo",
            "data_e_hora",
            "horario"
        ];
        for (const campo of obrigatorios) {
            if (!formData[campo] || String(formData[campo]).trim() === "") {
                setErro(`O campo '${campo.replace(/_/g, ' ')}' é obrigatório.`);
                return false;
            }
        }
        const data = formData.data_e_hora;
        const hora = formData.horario;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
            setErro("Data inválida. Use o formato AAAA-MM-DD.");
            return false;
        }
        if (!/^\d{2}:\d{2}$/.test(hora)) {
            setErro("Horário inválido. Use o formato HH:mm.");
            return false;
        }
        if (isNaN(Number(formData.peso)) || isNaN(Number(formData.altura))) {
            setErro("Peso e altura devem ser números válidos.");
            return false;
        }
        setErro("");
        return true;
    }

    function camposObrigatoriosPreenchidos() {
        const obrigatorios = [
            "nome",
            "peso",
            "altura",
            "tipo_sanguineo",
            "historico_de_saude",
            "area_medica_desejada",
            "motivo",
            "data_e_hora",
            "horario"
        ];
        return obrigatorios.every((campo) => formData[campo] && String(formData[campo]).trim() !== "");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setTentouSubmit(true);
        if (!validarCampos()) return;
        const dataHoraCompleta = `${formData.data_e_hora}T${formData.horario}`;
        try {
            const result = await cadastrarConsulta({
                ...formData,
                peso: Number(formData.peso),
                altura: Number(formData.altura),
                data_e_hora: dataHoraCompleta,
            });
            if (result.consulta || result.mensagem) {
                setErro("");
                setModalType("success");
                setModalMsg(result.mensagem || "Consulta cadastrada com sucesso!");
                setModalShow(true);
                setTimeout(() => navigate("/"), 1500);
            } else if (result.error || result.erro) {
                setModalType("error");
                setModalMsg(result.error || result.erro);
                setModalShow(true);
            } else {
                setModalType("error");
                setModalMsg("Erro ao cadastrar a consulta");
                setModalShow(true);
            }
        } catch (error) {
            setModalType("error");
            setModalMsg("Erro na requisição: " + error.message);
            setModalShow(true);
        }
    }

    return (
        <div id="container_ficha">
            <div id="back">
                <Button 
                    style={{
                        backgroundColor: "transparent",
                        border: "none"
                    }}
                    onClick={ () => {
                        navigate("/")
                    }}
                >
                    <img src={BackButton} width={40} height={40}/>
                </Button>
            </div>
            <main id="ficha">
                <h1>PREENCHA A FICHA:</h1>
                {tentouSubmit && erro && (
                    <div style={{ color: "red", marginBottom: 10 }}>{erro}</div>
                )}
                <form method="POST" onSubmit={handleSubmit}>
                    <FormInputSchedule
                        id={"nome"}
                        name={"nome"}
                        required={true}
                        iconrequired={"*"}
                        label={"Nome Completo:"}
                        type={"text"}
                        placeholder={"Digite seu nome"}
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    <div id="three_inputs">
                        <FormInputSchedule
                            id={"peso"}
                            name={"peso"}
                            required={true}
                            iconrequired={"*"}
                            label={"Peso:"}
                            type={"text"}
                            placeholder={"Digite seu peso"}
                            value={formData.peso}
                            onChange={handleChange}
                            maxLength={5}
                        />
                        <FormInputSchedule
                            id={"altura"}
                            name={"altura"}
                            required={true}
                            iconrequired={"*"}
                            label={"Altura:"}
                            type={"text"}
                            placeholder={"Digite sua altura"}
                            value={formData.altura}
                            onChange={handleChange}
                            maxLength={4}
                        />
                        <FormInputSchedule
                            id={"tipo_sanguineo"}
                            name={"tipo_sanguineo"}
                            required={true}
                            iconrequired={"*"}
                            label={"Tipo Sanguíneo:"}
                            type={"select"}
                            options={Dados.tiposSanguineos}
                            placeholder={"Digite seu tipo sanguíneo"}
                            value={formData.tipo_sanguineo}
                            onChange={handleChange}
                        />
                    </div>

                    <FormInputSchedule
                        id={"historico_de_saude"}
                        name={"historico_de_saude"}
                        iconrequired={"*"}
                        label={"Histórico de Saúde:"}
                        required={true}
                        type={"text"}
                        placeholder={
                            "Possuo Doença/Condição X, e tomo remédio Y"
                        }
                        value={formData.historico_de_saude}
                        onChange={handleChange}
                    />

                    <div id="three_inputs">
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"area_medica_desejada"}
                            name={"area_medica_desejada"}
                            iconrequired={"*"}
                            label={"Área médica:"}
                            required={true}
                            type={"select"}
                            options={Dados.areasMedicas}
                            value={formData.area_medica_desejada}
                            onChange={handleChange}
                        />
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"horario"}
                            name={"horario"}
                            iconrequired={"*"}
                            label={"Horários disponíveis:"}
                            required={true}
                            type={"select"}
                            options={Dados.horarios}
                            value={formData.horario}
                            onChange={handleChange}
                        />
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"data_e_hora"}
                            name={"data_e_hora"}
                            iconrequired={"*"}
                            label={"Data da consulta:"}
                            required={true}
                            type={"date"}
                            value={formData.data_e_hora}
                            onChange={handleChange}
                            min={dataAtual} // Impede datas anteriores
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormInputSchedule
                            id={"motivo"}
                            name={"motivo"}
                            iconrequired={"*"}
                            label={"Motivo da consulta:"}
                            required={true}
                            type={"textarea"}
                            placeholder={"Digite o motivo da consulta"}
                            value={formData.motivo}
                            onChange={handleChange}
                        />
                    </div>
                    <div id="container_button_submit">
                        <Button
                            text={"PROSSEGUIR"}
                            type={"submit"}
                            style={{
                                backgroundColor: "#043C40",
                                border: "None",
                                borderRadius: 37.5,
                                fontFamily: "Passion One",
                                fontSize: "1.5em",
                                width: "50%",
                                opacity: camposObrigatoriosPreenchidos() ? 1 : 0.5,
                                cursor: camposObrigatoriosPreenchidos() ? "pointer" : "not-allowed"
                            }}
                            disabled={!camposObrigatoriosPreenchidos()}
                        />
                    </div>
                </form>
                <MoModal
                    show={modalShow}
                    onClose={() => setModalShow(false)}
                    text={modalMsg}
                    styleBody={{ color: modalType === "error" ? "#b30000" : "#004D3E", fontSize: 18 }}
                />
            </main>
        </div>
    );
}
