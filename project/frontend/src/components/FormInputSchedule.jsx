import React from 'react';
// idDiv serve para encapsular o input e estilizar (como alterar o tamanho)
export default function FormInput({ id, idDiv=null, name, label, type, placeholder, required=false, iconrequired="", options, rows=3, ...restProps }) {

    const paddingPadrao = 10;
    const borderRadiusPadrao = 15;
    
    const renderInput = () => {
        return (
            <input
                type={type}
                className={"inputs form-control w-100"}
                id={id}
                name={name}
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
                name={name}
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
                name={name}
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
