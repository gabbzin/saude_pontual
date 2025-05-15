import React from 'react';

export default function FormInput({ id, label, type, placeholder, required=Boolean, iconrequired, ...restProps }) {
    
    return (
        <div className="form-label my-2">
            <label
                htmlFor={id}
                style={{
                    backgroundColor: 'transparent',
                    fontSize: 18
                }}>
                {label} <span style={{color: "#F00"}}>{iconrequired}</span>
            </label>
            <input
                type={type}
                className="inputs form-control mb-2 w-100"
                id={id}
                placeholder={placeholder}
                required={required}
                style={{
                    backgroundColor: "#97B5AB",
                    border: "None",
                    borderRadius: 15,
                    padding: 10
                }}
                {...restProps}
            />
        </div>
    );
}
