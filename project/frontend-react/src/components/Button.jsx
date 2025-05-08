import React from "react";
import "../styles/login.css";

export default function Button({id, text, onClick, style={}}) {
    return (
        <button id={id} className="btn btn-primary" style={style} onClick={onClick}>
            {text}
        </button>
    );
}