import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Dados from "../dados.json";
// Assets
import BackButton from "../assets/back_button.png"
import Logo from "../assets/logo_saude_pontual.png";
// Components
import Button from "../components/Button";
// Styles
import "../styles/historico.css";

export default function Historico() {

    // eslint-disable-next-line no-unused-vars
    const { usuario } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    function fazerLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div id="history_container">
            <header id="box_history">
                <Button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0,
                    }}
                    onClick={fazerLogout}
                >
                    <img src={BackButton} height={40} width={50} />
                </Button>
                <h1>HISTÓRICO DE CONSULTA</h1>
                <img id="logo" src={Logo} height={40} width={40} />
            </header>
            <main id="history_wrapper">
                <table id="tabela">
                    <thead>
                        <tr>
                            <th>Tipo de Consulta</th>
                            <th>Profissional Responsável</th>
                            <th>Data</th>
                            <th>Protocolo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Dados.consultas.map((consulta, index) => (
                            <tr key={index}>
                                <td>{consulta.tipo}</td>
                                <td>{consulta.profissional}</td>
                                <td>{consulta.data}</td>
                                <td>{consulta.protocolo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <aside id="fichapdf">
                    
                </aside>
            </main>
        </div>
    );
}
