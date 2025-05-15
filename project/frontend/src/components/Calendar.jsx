import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// eslint-disable-next-line react-refresh/only-export-components
export const today = new Date().toISOString().split('T')[0]

export default function Calendar({showModal}){

    return (
        <FullCalendar 
            plugins={[dayGridPlugin]} // Plugins
            themeSystem={"bootstrap5"} // Tema do calendário
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

            // Eventos
            events={[
                { title: "Consulta", date: today }
            ]}

            eventClick={showModal}
        />
        
    );
}