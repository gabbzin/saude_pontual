import React from "react";
import Background from "../components/Background";
import Button from "../components/Button";

import FundoLaranja from "../assets/background_orange.jpg";
import Logo from "../assets/logo_saude_pontual.png";
import ProfileIcon from "../assets/profile_icon.png";

import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home(){
    return (
        <div className="container flex" style={{
                "height": "100vh",
                "fontFamily": "sans-serif"
            }}>
            <Background imageUrl={FundoLaranja}/>

            <aside className="sidebar">
                
                <div className="logo-area">
                    <img src={Logo} alt="Logo" />
                    <h2>SAÚDE PONTUAL</h2>
                </div>

                <p className="descricao">
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
                <div className="header">
                    <img className="avatar" src={ProfileIcon} alt="Foto de Perfil" />
                    <h1>SEJA BEM-VINDA, THALITA KAMILLE!</h1>
                </div>
                <div id="calendar"></div>
                <div className="actions">
                    <Button 
                        id={"schedule"}
                        text={"Agendar Consulta"}
                    />
                    <Button 
                        id={"Profile"}
                        text={"Ir ao perfil"}
                    />
                </div>
            </main>
        </div>
    );
}