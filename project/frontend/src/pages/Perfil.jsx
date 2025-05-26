import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// Assets
import BackButton from "../assets/back_button.png";
import FundoLaranja from "../assets/background_orange.jpg";
// Componentes
import Background from "../components/Background";
import Button from "../components/Button";
// Styles
import "../styles/profile.css";

export default function Perfil(){
    
    // eslint-disable-next-line no-unused-vars
    const usuario = useContext(AuthContext);

    const navigate = useNavigate();

    function redirectToHome(){
        navigate("/")
    }

    return (
        <div id="profile_container">
            <Background imageUrl={FundoLaranja}/>

            <header id="profile_box">
                <Button style={{
                        backgroundColor: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }} onClick={redirectToHome}
                >

                    <img src={BackButton} height={35} width={35}/>
                </Button>
            </header>
        </div>
    );
}