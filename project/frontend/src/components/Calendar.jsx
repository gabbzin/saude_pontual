import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import InteractionPlugin from "@fullcalendar/interaction";
import "../styles/calendario.css";

export default function Calendar({showModal}){

    return (
        <FullCalendar 
            plugins={[dayGridPlugin, InteractionPlugin]} // Plugins
            headerToolbar={{
                left: "prev next",
                center: "title",
                right: "today"
            }}

            initialView={"dayGridMonth"} // Visualização Inicial
            locale={"pt-br"} // Local do calendário
            height={"100%"} // Altura do calendário
            weekends={true} // Final de semana 
            fixedWeekCount={false} // Números de semanas fixos
            nowIndicator={true} // Indicador do dia atual

            dateClick={(arg) => {showModal(arg.dateStr)}}

            // Eventos
            events={[]}

        />
        
    );
}