import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { buscarHistoricoConsultas } from "../../../api/api";
// Assets
import BackButton from "../../assets/back_button.png";
import Logo from "../../assets/logo_saude_pontual.png";
import Relatorio from "../../assets/relatorio.jpg";
// Components
import Button from "../../components/Button";
// Styles
import "../../styles/historico.css";
import { generateSaudePontualPdf } from "../../utils/pdfGenerator";

export default function Historico() {
    const navigate = useNavigate();
    const [consultas, setConsultas] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function fetchConsultas() {
            setLoading(true);
            const data = await buscarHistoricoConsultas();
            const lista = Array.isArray(data.consultas) ? data.consultas : [];
            setConsultas(lista);
            setSelectedConsulta(lista.length > 0 ? lista[0] : null);
            setLoading(false);
        }
        fetchConsultas();
    }, []);

    function redirectToHome() {
        navigate("/");
    }

    function handleConsultaClick(consulta) {
        setSelectedConsulta(consulta);
        setMensagem("");
        console.log("Consulta selecionada: ", consulta);
    }

    const handleDownloadRelatorio = async () => {
        if (!selectedConsulta || !selectedConsulta.descricao) {
            setMensagem("Selecione um relatório para baixar.");
            return;
        }

        setLoading(true);
        setMensagem("");
        try {
            const nomeFormatado = selectedConsulta.paciente_nome.replace(/\s/g, "_");
            const fileName = `Relatorio-${nomeFormatado}.pdf`;

            await generateSaudePontualPdf(selectedConsulta.relatorio, fileName);
        } catch (error) {
            console.error("Erro ao gerar o PDF:", error);
            setMensagem("Erro ao gerar o PDF. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

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
                {loading ? (
                    <p>Carregando...</p>
                ) : (
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
                            {consultas.map((consulta, index) => (
                                <tr
                                    id="tr"
                                    key={consulta.id || index}
                                    className={`tablerow ${
                                        selectedConsulta &&
                                        selectedConsulta.id === consulta.id
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleConsultaClick(consulta)
                                    }
                                >
                                    <td className="td text-capitalize">
                                        {consulta.area_medica_desejada ||
                                            consulta.tipo_consulta}
                                    </td>
                                    <td className="td">
                                        {consulta.profissional_nome ||
                                            consulta.profissional}
                                    </td>
                                    <td className="td">
                                        {consulta.data_para_exibicao || "-"}
                                    </td>
                                    <td className="td">{consulta.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <aside id="fichapdf">
                    <h2>Saúde Pontual</h2>
                    <img
                        src={Relatorio}
                        alt="relatorio"
                        width={200}
                        height={280}
                    />
                    <Button
                        id={"download_button"}
                        onClick={handleDownloadRelatorio}
                        disabled={!selectedConsulta || loading}
                    >
                        {loading ? "Gerando PDF..." : "Baixar Relatório"}
                    </Button>
                    {mensagem && <p className="text-danger">{mensagem}</p>}
                </aside>
            </main>
        </div>
    );
}
