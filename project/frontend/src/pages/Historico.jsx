import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Dados from "../dados.json";
// Assets
import BackButton from "../assets/back_button.png"
import Logo from "../assets/logo_saude_pontual.png";
import Relatorio from "../assets/relatorio.jpg";
// Components
import Button from "../components/Button";
// Styles
import "../styles/historico.css";

export default function Historico() {

    // eslint-disable-next-line no-unused-vars
    const { usuario } = useContext(AuthContext);

    const navigate = useNavigate();

    function redirectToHome() {
        navigate("/");
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
                    onClick={redirectToHome}
                >
                    <img src={BackButton} height={40} width={50} />
                </Button>
                <h1>HISTÓRICO DE CONSULTA</h1>
                <img id="logo" src={Logo} height={40} width={40} />
            </header>
            <main id="history_wrapper">
                <table id="tabela">
                    <thead id="thead">
                        <tr id="tr">
                            <th className="th">Tipo de Consulta</th>
                            <th className="th">Profissional Responsável</th>
                            <th className="th">Data</th>
                            <th className="th">Protocolo</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {Dados.consultas.map((consulta, index) => (
                            <tr id="tr" key={index} className="tablerow">
                                <td className="td">{consulta.tipo}</td>
                                <td className="td">{consulta.profissional}</td>
                                <td className="td">{consulta.data}</td>
                                <td className="td">{consulta.protocolo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <aside id="fichapdf">
                    <h2>Saúde Pontual</h2>
                    <img src={Relatorio} alt="relatorio" width={200} height={280}/>
                    <p>40028922</p>
                    <Button id={"download_button"}>
                        Baixar Ficha                        
                    </Button>
                </aside>
            </main>
        </div>
    );
}
