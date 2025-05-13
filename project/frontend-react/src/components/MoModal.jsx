import React, { Children } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MoModal({ show, onClose, text, children, styleBody }){
    
    const modalPadrao = 
        <>
            <Modal.Header closeButton />
            <Modal.Body style={styleBody}>
                {text}
            </Modal.Body>
        </>
        
    return (
        <div>
            <Modal 
                show={show}
                onHide={onClose}
                centered
            >
                {children ? children : modalPadrao}
            </Modal>
        </div>
    );
}