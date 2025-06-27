import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import InteractionPlugin from "@fullcalendar/interaction";
import { buscarConsultasPetUsuario } from "../../api/api";
import "../styles/calendario.css";

export default function Calendar({ showModal, consultas: consultasProp }) {
    const [consultas, setConsultas] = useState(consultasProp || []);
    const [datasConsultas, setDatasConsultas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchConsultas() {
            setLoading(true);
            try {
                const [human, pet] = await Promise.all([
                    (async () => {
                        const token = localStorage.getItem("token");
                        const res = await fetch("http://localhost:3001/api/consultas/historico", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        const data = await res.json();
                        return data.consultas || [];
                    })(),
                    buscarConsultasPetUsuario().then(data => data.consultas || [])
                ]);
                // Unifica e normaliza os campos para o calendário
                const todasConsultas = [
                    ...human.map(c => ({
                        ...c,
                        tipo: "humano",
                        data_para_calendario: c.data_para_calendario,
                    })),
                    ...pet.map(c => ({
                        ...c,
                        tipo: "pet",
                        data_para_calendario: c.data_para_calendario,
                    }))
                ];
                setConsultas(todasConsultas);
                setDatasConsultas(todasConsultas.map(c => c.data_para_calendario));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (!consultasProp) fetchConsultas();
        else {
            setConsultas(consultasProp);
            setDatasConsultas(consultasProp.map((consulta) => consulta.data_para_calendario));
        }
    }, [consultasProp]);

    const handleDateClick = (arg) => {
        const consultasNoDia = consultas.filter(
            (consulta) => consulta.data_para_calendario === arg.dateStr
        );
        if (consultasNoDia.length > 0) {
            showModal(arg.dateStr, consultasNoDia); // Passa a data e as consultas do dia para o modal
        } else {
            showModal(arg.dateStr, []); // Se não houver consultas, passa uma lista vazia
        }
    };

    const dayCellClassNames = (arg) => {
        if (datasConsultas.includes(arg.date.toISOString().split("T")[0])) {
            return "consulta-marcada"; // Classe CSS para marcar as datas com consultas
        }
        return ""; // Retorna uma string vazia se não houver consulta marcada
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, InteractionPlugin]} // Plugins
            headerToolbar={{
                left: "prev next",
                center: "title",
                right: "today",
            }}
            initialView={"dayGridMonth"} // Visualização Inicial
            locale={"pt-br"} // Local do calendário

            buttonText={{
                today: "Hoje"
            }}
            height={"100%"} // Altura do calendário
            weekends={true} // Final de semana
            fixedWeekCount={false} // Números de semanas fixos
            nowIndicator={true} // Indicador do dia atual
            dayCellClassNames={dayCellClassNames} // Classe CSS para as células do dia

            dateClick={(arg) => {
                handleDateClick(arg);
            }} // Mostra o modal após clicar na data
            // Eventos
            events={[]}
        />
    );
}
