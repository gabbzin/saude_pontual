import React from 'react';
import "../styles/login.css";

export default function FormInput({ id, label, type, placeholder, required, ...restProps }) {
    return (
        <div className="form-floating my-2">
            <input
                type={type}
                className="inputs form-control mb-3"
                id={id}
                placeholder={placeholder}
                required={required}
                style={{
                    border: "None"
                }}
                {...restProps}
            />
            <label
                htmlFor={id} 
                style={{
                    backgroundColor: 'transparent',
                }}>
                {label}
            </label>
        </div>
    );
}
