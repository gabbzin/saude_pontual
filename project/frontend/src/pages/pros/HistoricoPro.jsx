import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Assets
import BackButton from "../../assets/back_button.png";
import Logo from "../../assets/logo_saude_pontual.png";
import Relatorio from "../../assets/relatorio.jpg";
// Components
import Button from "../../components/Button";
// Styles
import "../../styles/historico.css";
// Api
import { buscarConsultas } from "../../../api/api";
import { generateSaudePontualPdf } from "../../utils/pdfGenerator";

export default function HistoricoPro() {
    const navigate = useNavigate();
    const [consultas, setConsultas] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchConsultas = async () => {
            setLoading(true);
            setMensagem("");
            try {
                const data = await buscarConsultas();
                if (data.consultas) {
                    setConsultas(data.consultas);
                    if (data.consultas.length > 0) {
                        setSelectedConsulta(data.consultas[0]);
                    }
                }
            } catch (error) {
                setMensagem("Erro ao buscar consultas");
                console.error("Erro ao buscar as consultas do profissional", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, []);

    function redirectToHome() {
        navigate("/homepro");
    }

    const handleDownloadRelatorio = async () => {
        if (!selectedConsulta || !selectedConsulta.relatorio) {
            setMensagem("Selecione um relatório para baixar.");
            return;
        }

        setLoading(true);
        setMensagem("");

        try {
            const nomeFormatado = (
                selectedConsulta.usuario_nome || "paciente"
            ).replace(/\s/g, "_");
            const fileName = `Relatorio-${nomeFormatado}.pdf`;

            await generateSaudePontualPdf(selectedConsulta.relatorio, fileName);
        } catch (error) {
            setMensagem("Erro ao gerar o PDF");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    function handleConsultaClick(consulta) {
        setSelectedConsulta(consulta);
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
                <h1 className="text-uppercase fs-2">
                    Histórico e Relatórios enviados
                </h1>
                <img id="logo" src={Logo} height={40} width={40} />
            </header>
            <main id="history_wrapper">
                <table id="tabela">
                    <thead id="thead">
                        <tr id="tr">
                            <th className="th">Paciente</th>
                            <th className="th">Data</th>
                            <th className="th">Hora</th>
                            <th className="th">Protocolo</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {loading && consultas.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    {mensagem || "Carregando histórico..."}
                                </td>
                            </tr>
                        )}
                        {!loading && consultas.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    {mensagem || "Nenhum histórico encontrado."}
                                </td>
                            </tr>
                        )}
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
                                onClick={() => handleConsultaClick(consulta)}
                            >
                                <td className="td">{consulta.nome || "-"}</td>
                                <td className="td">
                                    {consulta.data_para_exibicao || "-"}
                                </td>
                                <td className="td">
                                    {consulta.hora_para_exibicao || "-"}
                                </td>
                                <td className="td">{consulta.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <aside id="fichapdf">
                    <h2 className="fs-1">Saúde Pontual</h2>
                    <img
                        src={Relatorio}
                        alt="relatorio"
                        width={200}
                        height={280}
                    />
                    <Button
                        id={"download_button"}
                        onClick={handleDownloadRelatorio}
                        disabled={
                            !selectedConsulta || !selectedConsulta.relatorio
                        }
                    >
                        Download
                    </Button>

                    {mensagem && !loading && (
                        <p className="text-danger">{mensagem}</p>
                    )}
                </aside>
            </main>
        </div>
    );
}
