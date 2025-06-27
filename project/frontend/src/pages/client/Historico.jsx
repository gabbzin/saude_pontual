import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { buscarConsultas, buscarConsultasPetUsuario } from "../../../api/api";
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
    const [selectedConsultaKey, setSelectedConsultaKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");

    // Função para gerar uma chave única para cada consulta
    function getConsultaKey(consulta) {
        return `${consulta.tipo}-${consulta.id}`;
    }

    useEffect(() => {
        async function fetchConsultas() {
            setLoading(true);
            const [humanData, petData] = await Promise.all([
                buscarConsultas(),
                buscarConsultasPetUsuario(),
            ]);
            const listaHuman =
                Array.isArray(humanData.consultas) &&
                humanData.consultas.length > 0
                    ? humanData.consultas.map((c) => ({ ...c, tipo: "humano" }))
                    : [];
            const listaPet =
                Array.isArray(petData.consultas) && petData.consultas.length > 0
                    ? petData.consultas.map((c) => ({
                          ...c,
                          tipo: "pet",
                          area_medica_desejada: "Consulta Pet",
                          profissional_nome: "-",
                          data_para_exibicao: c.data_para_exibicao,
                          id: c.id,
                      }))
                    : [];
            const lista = [...listaHuman, ...listaPet].sort((a, b) => {
                // Ordena por data decrescente
                const dA = a.data_para_calendario || a.data_para_exibicao || "";
                const dB = b.data_para_calendario || b.data_para_exibicao || "";
                return dA < dB ? 1 : -1;
            });
            setConsultas(lista);
            if (lista.length > 0) {
                setSelectedConsulta(lista[0]);
                setSelectedConsultaKey(getConsultaKey(lista[0]));
            }
            setLoading(false);
        }
        fetchConsultas();
    }, []);

    function redirectToHome() {
        navigate("/");
    }

    function handleConsultaClick(consulta) {
        setSelectedConsulta(consulta);
        setSelectedConsultaKey(getConsultaKey(consulta));
        setMensagem("");
        console.log("Consulta selecionada: ", consulta);
    }

    const handleDownloadRelatorio = async () => {
        if (!selectedConsulta || !selectedConsulta.relatorio) {
            setMensagem("Selecione um relatório para baixar.");
            return;
        }
        setLoading(true);
        setMensagem("");
        try {
            const nomeFormatado = (selectedConsulta.nome || "consulta").replace(
                /\s/g,
                "_"
            );
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
                                    key={getConsultaKey(consulta)}
                                    className={`tablerow ${
                                        selectedConsultaKey === getConsultaKey(consulta)
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
                                            consulta.profissional ||
                                            "-"}
                                    </td>
                                    <td className="td">
                                        {consulta.data_para_exibicao || "-"}
                                    </td>
                                    <td className="td">
                                        {consulta.tipo === "pet"
                                            ? `PET-${consulta.id}`
                                            : consulta.id}
                                    </td>
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
