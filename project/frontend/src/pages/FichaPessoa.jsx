import React from "react";

import Button from "../components/Button"
import FormInputSchedule from "../components/FormInputSchedule";

import Dados from "../dados.json";

import "../styles/fichas.css";

export default function FichaPessoa(){
    return (
        <div id="container_ficha">
            <main id="ficha">
                <h1>PREENCHA A FICHA:</h1>
                <form action="POST">
                    <FormInputSchedule
                        id={"name"}
                        name={"name"} 
                        required={true}
                        iconrequired={"*"}
                        label={"Nome Completo:"}
                        type={"text"}
                        placeholder={"Digite seu nome"}
                    />
                    <FormInputSchedule
                        id={"idade"}
                        name={"idade"} 
                        required={true}
                        iconrequired={"*"}
                        label={"Idade:"}
                        type={"text"}
                        placeholder={"Digite sua idade"}
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
                        />
                        <FormInputSchedule
                            id={"altura"}
                            name={"altura"} 
                            required={true}
                            iconrequired={"*"}
                            label={"Altura:"}
                            type={"text"}
                            placeholder={"Digite sua altura"}
                        />
                        <FormInputSchedule
                            id={"tipo_sanguineo"}
                            name={"tipo_sanguineo"} 
                            required={true}
                            iconrequired={"*"}
                            label={"Tipo Sanguíneo:"}
                            type={"text"}
                            placeholder={"Digite seu tipo sanguíneo"}
                        />
                    </div>

                    <FormInputSchedule
                        id={"historico_de_saude"}
                        name={"historico_de_saude"} 
                        iconrequired={"*"}
                        label={"Histórico de Saúde:"}
                        required={true}
                        type={"text"}
                        placeholder={"Possuo Doença/Condição X, e tomo remédio Y"}
                    />

                    <div id="two_inputs">
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"area_medica_desejada"}
                            name={"area_medica_desejada"} 
                            iconrequired={"*"}
                            label={"Área médica desejada:"}
                            required={true}
                            type={"select"}
                            options={Dados.areasMedicas}
                        />
                        <div style={{margin: 15}}/>
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"horarios_disponiveis"}
                            name={"horarios_disponiveis"} 
                            iconrequired={"*"}
                            label={"Horários disponíveis:"}
                            required={true}
                            type={"select"}
                            options={Dados.horarios}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FormInputSchedule
                            id={"motivo_da_consulta"}
                            name={"motivo_da_consulta"} 
                            iconrequired={"*"}
                            label={"Motivo da consulta:"}
                            required={true}
                            type={"textarea"}
                            placeholder={"Digite o motivo da consulta"}
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
                                width: "50%"
                            }}
                        />
                    </div>
                </form>
            </main>
        </div>
    );
}