import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MoModal({ show, onClose, text, styleBody }){
    
    return (
        <div>
            <Modal 
                show={show}
                onHide={onClose}
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body style={styleBody}>
                    {text}
                </Modal.Body>
            </Modal>
        </div>
    );
}