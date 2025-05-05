import React from 'react';

export default function FormInput({ id, label, type, placeholder }) {
    return (
        <div className="form-floating my-2">
        <input
            type={type}
            className="inputs form-control mb-3"
            id={id}
            placeholder={placeholder}
        />
        <label htmlFor={id}>
            {label}
            </label>
        </div>
    );
}
