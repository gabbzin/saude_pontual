import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarConsulta } from "../../../api/api";
// Components
import Button from "../../components/Button";
import FormInputSchedule from "../../components/FormInputSchedule";
import BackButton from "../../assets/back_button.png";

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

    const navigate = useNavigate();

    function handleChange(e) {
        let { name, value } = e.target;

        if(name === "peso" || name === "altura"){ // Pode dar erro, caso os números flutuantes venham com virgula
            value = value.replace(",", ".");
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const dataHora = formData.data_e_hora || "";
        const horario = formData.horario || "";
        const dataHoraCompleta = horario ? `${dataHora}T${horario}` : dataHora;

        try {
            const result = await cadastrarConsulta({
                ...formData,
                data_e_hora: dataHoraCompleta,
            });

            if (result.mensagem) {
                alert(result.mensagem);
                navigate("/"); // Navega para a home (ou onde quiser)
            } else {
                alert("Erro ao cadastrar a consulta");
            }
        } catch (error) {
            alert("Erro na requisição: " + error.message);
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
                            }}
                        />
                    </div>
                </form>
            </main>
        </div>
    );
}
