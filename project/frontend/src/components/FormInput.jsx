import React from 'react';

export default function FormInput({ id, name, label, type, placeholder, required=false, iconrequired, options, ...restProps }) {

    const renderSelect = () => {
        return (
            <select
                id={id}
                name={name}
                className={"inputs form-select"}
                required={required}
                style={{
                    border: "None",
                }}
                {...restProps}
            >
                {options && options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    const renderInput = () => {
        return (
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
        );
    }

    return (
        <div className="form-floating my-2">
            {type === "select" ? renderSelect() : renderInput()}
            
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
