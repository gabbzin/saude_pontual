import React from "react";

export default function Button({id, text, className, type, children, onClick, style={}}) {
    return (
        <button id={id} className={`${className} text-white`} style={style} onClick={onClick} type={type}>
            {children ? children : text}
        </button>
    );
}