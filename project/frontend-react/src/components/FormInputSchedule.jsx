import React from 'react';

export default function FormInput({ id, idDiv=null, label, type, placeholder, required=false, iconrequired="", options, rows=3, ...restProps }) {

    const paddingPadrao = 10;
    const borderRadiusPadrao = 15;
    
    const renderInput = () => {
        return (
            <input
                type={type}
                className={"inputs form-control w-100"}
                id={id}
                placeholder={placeholder}
                required={required}
                style={{
                    backgroundColor: "#97B5AB",
                    border: "None",
                    borderRadius: borderRadiusPadrao,
                    padding: paddingPadrao
                }}
                {...restProps}
            />
        );
    }

    const renderSelect = () => {
        return (
            <select
                id={id}
                className={"form-select"}
                required={required}
                style={{
                    backgroundColor: "#97B5AB",
                    border: "None",
                    borderRadius: borderRadiusPadrao,
                    padding: paddingPadrao,
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

    const renderTextArea = () => {
        return (
            <textarea
                id={id}
                className={"form-text w-100"}
                placeholder={placeholder}
                required={required}
                rows={rows}
                style={{
                    backgroundColor: "#97B5AB",
                    border: "None",
                    borderRadius: borderRadiusPadrao,
                    padding: paddingPadrao,
                    resize: "None"
                }}
                {...restProps}
            />
        );
    }

    return (
        <div id={idDiv} className="form-label my-2">
            <label
                htmlFor={id}
                style={{
                    backgroundColor: 'transparent',
                    fontSize: 18,
                    display: 'block'
                }}>
                {label} <span style={{color: "#F00"}}>{iconrequired}</span>
            </label>
            {type === 'select' ? renderSelect() : type === 'textarea' ? renderTextArea() : renderInput()}
        </div>
    );
}
