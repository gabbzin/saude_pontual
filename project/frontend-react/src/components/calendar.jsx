import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar(){

    const today = new Date().toISOString().split('T')[0]

    return (
        <FullCalendar 
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            height="100%"
            weekends={true}
            events={[
                { title: "Evento 1", date: today }
            ]}
        />
    );
}