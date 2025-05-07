import React, {useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MoModal({ text }){
    
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer)
    }, []);
    
    return (
        <div>
            <Modal 
                show={show}
                onHide={() => setShow(false)}
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    {text}
                </Modal.Body>
            </Modal>
        </div>
    );
}