import React from "react";

export default function Button({id, text, children, onClick, style={}}) {
    return (
        <button id={id} className="btn btn-primary" style={style} onClick={onClick}>
            {children ? children : text}
        </button>
    );
}