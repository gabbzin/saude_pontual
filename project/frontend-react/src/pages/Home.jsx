import React from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import Calendar from "../components/calendar";

import FundoLaranja from "../assets/background_orange.jpg";
import Logo from "../assets/logo_saude_pontual.png";
import ProfileIcon from "../assets/profile_icon.png";

import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home(){

    const resolucaoLogoXY = 200;
    const resolucaoProfileXY = 85;

    return (
        <div id="container">
            <Background imageUrl={FundoLaranja}/>

            <header id="caixabranca">
                <Button />
            </header>

            <div className="content">
                <aside className="sidebar">
                
                    <div className="d-grid">
                        <img src={Logo} alt="Logo" width={resolucaoLogoXY} height={resolucaoLogoXY} style={{margin: "auto"}}/>
                        <h2 className="text-center">SAÚDE PONTUAL</h2>
                    </div>
                    <p className="description">
                        Nosso propósito é simplificar sua jornada de cuidados,
                        oferecendo acesso rápido a informações sobre medicamentos,
                        agendamentos de consultas e acompanhamento médico.
                        Com nossa plataforma, conectamos você aos profissionais de
                        saúde de forma ágil e segura, sempre com o apoio da UNICEPLAC.
                        <br />
                        Obrigado por confiar em nós!
                    </p>
                    <Button
                        id={"historico"}
                        text={"Histórico de Consultas"}
                        onClick={() => {
                            console.log("Abrir Histórico")
                        }}
                        style={{
                        }}
                    />
                </aside>
                <main className="main-content">
                    <div className="header flex">
                        <img className="avatar" src={ProfileIcon} alt="Foto de Perfil"
                            width={resolucaoProfileXY} height={resolucaoProfileXY}
                            style={{
                                borderRadius: "50%"
                            }}
                        />
                        <h1>SEJA BEM-VINDA, THALITA KAMILLE!</h1>
                    </div>
                    <div id="calendar" style={{maxHeight: "100vh"}}>
                        <Calendar/>
                    </div>
                    <div className="actions">
                        <Button
                            id={"schedule"}
                            text={"Agendar Consulta"}
                            onClick={() => {console.log("Agendar Consulta")}}
                        />
                        <Button
                            id={"profile"}
                            text={"Ir ao perfil"}
                            onClick={() => {console.log("Ir ao perfil")}}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}