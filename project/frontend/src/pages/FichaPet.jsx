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
                        required={true}
                        iconrequired={"*"}
                        label={"Nome do animal:"}
                        type={"text"}
                        placeholder={"Digite o nome do pet"}
                    />
                    <div id="three_inputs">
                        <FormInputSchedule
                            id={"especie"}
                            required={true}
                            iconrequired={"*"}
                            label={"Espécie:"}
                            type={"text"}
                            placeholder={"Digite a espécie (Cachorro)"}
                        />
                        <FormInputSchedule
                            id={"raca"}
                            required={true}
                            iconrequired={"*"}
                            label={"Raça:"}
                            type={"text"}
                            placeholder={"Digite a raça"}
                        />
                        <FormInputSchedule
                            id={"sexo"}
                            required={true}
                            iconrequired={"*"}
                            label={"Sexo:"}
                            type={"text"}
                            placeholder={"Digite o sexo"}
                        />
                    </div>

                    <div id="three_inputs">
                        <FormInputSchedule
                            id={"esterilizacao"}
                            required={true}
                            iconrequired={"*"}
                            label={"Esterilização:"}
                            type={"text"}
                            placeholder={"Ex: Castrado"}
                        />
                        <FormInputSchedule
                            id={"cor"}
                            required={true}
                            iconrequired={"*"}
                            label={"Cor:"}
                            type={"text"}
                            placeholder={"Digite a cor"}
                        />
                        <FormInputSchedule
                            id={"peso"}
                            required={true}
                            iconrequired={"*"}
                            label={"Peso:"}
                            type={"text"}
                            placeholder={"Digite o peso"}
                        />
                    </div>

                    <div id="two_inputs">
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"identificacao"}
                            label={"Identificação:"}
                            type={"text"}
                            placeholder={"Digite a identificacao"}
                        />
                        <div style={{margin: 15}} />
                        <FormInputSchedule
                            idDiv={"input_caixa"}
                            id={"horarios"}
                            iconrequired={"*"}
                            label={"Horários Disponíveis:"}
                            required={true}
                            type={"select"}
                            options={Dados.horarios}
                        />
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FormInputSchedule
                            id={"historico_de_saude"}
                            iconrequired={"*"}
                            label={"Histórico de Saúde:"}
                            placeholder={"Histórico de doenças, vacinas, remédios"}
                            required={true}
                            rows={2}
                            type={"textarea"}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FormInputSchedule
                            id={"motivo_consulta"}
                            iconrequired={"*"}
                            label={"Motivo da Consulta:"}
                            placeholder={"Digite o motivo da consulta"}
                            required={true}
                            rows={2}
                            type={"textarea"}
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