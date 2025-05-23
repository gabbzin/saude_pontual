import React from 'react';

export default function FormInput({ id, name, label, type, placeholder, required=false, iconrequired, ...restProps }) {

    return (
        <div className="form-floating my-2">
            <input
                type={type}
                className="inputs form-control mb-2"
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                style={{
                    border: "None",
                }}
                {...restProps}
            />
            <label
                htmlFor={id}
                style={{
                    backgroundColor: 'transparent',
                }}>
                {label} <span style={{color: "#F00"}}>{iconrequired}</span>
            </label>
        </div>
    );
}
