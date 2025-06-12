import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import InteractionPlugin from "@fullcalendar/interaction";
import "../styles/calendario.css";

export default function Calendar({ showModal }) {
    const [consultas, setConsultas] = useState([]); // Estado para armazenar as consultas
    const [datasConsultas, setDatasConsultas] = useState([]); // Estado para armazenar as datas das consultas

    useEffect(() => {
        // Função para buscar as consultas do usuário
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token não encontrado");
            return;
        }

        // Função para buscar as consultas do usuário
        const fetchConsultas = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/consultas/historico",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar consultas");
                }

                const data = await response.json();

                const consultas = data.consultas || []; // Verifica se 'consultas' existe no objeto retornado

                if (Array.isArray(consultas)) {
                    setConsultas(consultas);
                    setDatasConsultas(consultas.map((consulta) => consulta.data_para_calendario));
                } else {
                    setConsultas([]);
                    setDatasConsultas([]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchConsultas();
    }, []);

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
