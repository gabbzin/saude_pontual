import { createContext, useEffect, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(); // Instância do contexto


export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const usuarioSalvo = localStorage.getItem("usuario");

        if (token && usuarioSalvo){
            setUsuario(JSON.parse(usuarioSalvo));
        }
    

        setCarregando(false);
    }, []);

    const login = (usuario, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setUsuario(usuario);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{usuario, login, logout, carregando}}>
            {children}
        </AuthContext.Provider>
    );
}