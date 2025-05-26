import React from "react";

export default function Button({id, text, className, type, children, onClick, style={}}) {
    return (
        <button id={id} className={`btn btn-primary ${className}`} style={style} onClick={onClick} type={type}>
            {children ? children : text}
        </button>
    );
}