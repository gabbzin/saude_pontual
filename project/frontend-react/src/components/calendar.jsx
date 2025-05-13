import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Modal } from "react-bootstrap";
import MoModal from "./MoModal";

export default function Calendar(){

    const today = new Date().toISOString().split('T')[0]
    const [modalVisible, setModalVisible] = useState(false)

    function showModal(){
        setModalVisible(true)
        console.log("Estado do Modal do Calendário" + modalVisible)
    }

    const ModalConsulta = <> {/* Modal para visualizar informações do evento */}
            <Modal.Header closeButton/>
            <Modal.Body>
                Data: ${today}
                Tipo de consulta: Ortopedia
                Nome do Profissional: Pedro João
                Horário: 08:35
            </Modal.Body>
        </>



    return (
        <FullCalendar 
            themeSystem={"bootstrap5"} // Tema do calendário
            plugins={[dayGridPlugin]} // Plugins
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