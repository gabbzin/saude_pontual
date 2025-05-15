import React from "react";

import Button from "../components/Button"
import FormInputSchedule from "../components/FormInputSchedule";

import "../styles/fichas.css";

export default function FichaPessoa(){
    return (
        <div id="container_ficha">
            <main id="ficha">
                <h1>PREENCHA A FICHA:</h1>
                <form action="POST">
                    <FormInputSchedule
                        id={"name"}
                        required={true}
                        iconrequired={"*"}
                        label={"Nome Completo:"}
                        type={"text"}
                    />
                    <FormInputSchedule
                        id={"idade"}
                        required={true}
                        iconrequired={"*"}
                        label={"Idade:"}
                        type={"text"}
                    />
                    <div id="peso_altura_sangue">
                        <FormInputSchedule
                            id={"Peso"}
                            required={true}
                            iconrequired={"*"}
                            label={"Peso:"}
                            type={"text"}
                        />
                        <FormInputSchedule
                            id={"altura"}
                            required={true}
                            iconrequired={"*"}
                            label={"Altura:"}
                            type={"text"}
                        />
                        <FormInputSchedule
                            id={"tipo_sanguineo"}
                            required={true}
                            iconrequired={"*"}
                            label={"Tipo Sanguíneo:"}
                            type={"text"}
                        />
                    </div>
                    <FormInputSchedule
                        id={"historico_de_saude"}
                        iconrequired={"*"}
                        label={"Histórico de Saúde:"}
                        required={true}
                        type={"text"}
                        placeholder={"Possuo Doença/Condição X, e tomo remédio Y"}
                    />
                    <div id="area_medica_e_horarios">
                        <FormInputSchedule
                            id={"area_medica_desejada"}
                            iconrequired={"*"}
                            label={"Área médica desejada:"}
                            required={true}
                            type={"text"}
                        />
                        <FormInputSchedule
                            id={"horarios_disponiveis"}
                            iconrequired={"*"}
                            label={"Horários disponíveis:"}
                            required={true}
                            type={"select"}
                            options={{
                    
                            }}
                        />
                    </div>
                    <FormInputSchedule
                        id={"motivo_da_consulta"}
                        iconrequired={"*"}
                        label={"Motivo da consulta:"}
                        required={true}
                        type={"text"}
                    />
                    <Button
                        text={"Prosseguir"}
                    />
                </form>
            </main>
        </div>
    );
}