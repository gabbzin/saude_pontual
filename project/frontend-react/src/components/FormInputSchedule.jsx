import React from 'react';

export default function FormInput({ method, id, label, type, placeholder, required=Boolean, iconrequired, ...restProps }) {
    
    return (
        <form className="form-label my-2" method={method}>
            <label
                htmlFor={id}
                style={{
                    backgroundColor: 'transparent',
                }}>
                {label} <span style={{color: "#F00"}}>{iconrequired}</span>
            </label>
            <input
                type={type}
                className="inputs form-control mb-3 w-100"
                id={id}
                placeholder={placeholder}
                required={required}
                style={{
                    border: "None"
                }}
                {...restProps}
            />
        </form>
    );
}
