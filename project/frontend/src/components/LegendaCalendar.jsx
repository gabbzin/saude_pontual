import React from "react";

export default function LegendaCalendario() {
    const estilosQuadrado = {
        width: "16px",
        height: "16px",
        borderRadius: "4px",
    };

    const legenda = [
        { cor: "green", texto: "DIA ATUAL" },
        { cor: "orange", texto: "DIA DE CONSULTA" },
    ];

    return (
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            {legenda.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <div
                        style={{
                            ...estilosQuadrado,
                            backgroundColor: item.cor,
                        }}
                    ></div>
                    <span style={{color: "FFF"}}>{item.texto}</span>
                </div>
            ))}
        </div>
    );
}
