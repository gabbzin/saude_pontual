import React from 'react';

export default function FormInput({ id, label, type, placeholder, required=false, iconrequired, options, ...restProps }) {
    
    const renderInput = () => {
        return (
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
        );
    }

    const renderSelect = () => {
        return (
            <select
                id={id}
                className={"form-select mb-2"}
                required={required}
                iconrequired={iconrequired}
                style={{
                    backgroundColor: "#97B5AB",
                    border: "None",
                    borderRadius: 15,
                    padding: 10
                }}
                {...restProps}
            >
                {options && options.map((option) => {
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                })}
            </select>
        );
    }

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
            {type === 'select' ? renderSelect() : renderInput()}
        </div>
    );
}
