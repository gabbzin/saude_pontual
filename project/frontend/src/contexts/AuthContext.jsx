import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(); // Instância do contexto

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const getUserFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return {
                id: decoded.id,
                role: decoded.role,
                email: decoded.email,
                nome: decoded.nome,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const usuarioDoToken = getUserFromToken(token);
            setUsuario(usuarioDoToken);
        }

        setCarregando(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const usuarioDoToken = getUserFromToken(token);
        setUsuario(usuarioDoToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
            {children}
        </AuthContext.Provider>
    );
};
