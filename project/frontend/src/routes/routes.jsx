import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import FichaPessoa from "../pages/FichaPessoa";
import FichaPet from "../pages/FichaPet";
import { AuthContext } from "../contexts/AuthContext";

const AppRoutes = () => {
    const {usuario, carregando} = useContext(AuthContext);

    if (carregando){
        return <div>Segura a emoção que tá carregando</div>
    }

    const redirectToLogin = <Navigate to="/login"/>;

    return (
        <Router>
            <Routes>
                {/* Rotas de Cadastro e Login */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Rotas Protegidas (Acessíveis apenas com o token) */}
                <Route path="/" element={usuario ? <Home /> : redirectToLogin} />
                <Route path="/fichapessoa" element={usuario ? <FichaPessoa /> : redirectToLogin} />
                <Route path="/fichapet" element={usuario ? <FichaPet /> : redirectToLogin} />

                {/* Rota genérica */}
                <Route path="*" element={redirectToLogin} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
