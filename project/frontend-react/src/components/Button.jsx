import React from "react";
import "../styles/login.css";

export default function Button({id, text, onClick}) {
    return (
        <button id={id} className="btn btn-primary" onClick={onClick}>
            {text}
        </button>
    );
}