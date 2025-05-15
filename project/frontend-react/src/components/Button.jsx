import React from "react";

export default function Button({id, text, type, children, onClick, style={}}) {
    return (
        <button id={id} className="btn btn-primary" style={style} onClick={onClick} type={type}>
            {children ? children : text}
        </button>
    );
}