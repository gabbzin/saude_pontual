import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home"
import FichaPessoa from "../pages/FichaPessoa";
import FichaPet from "../pages/FichaPet";

const AppRoutes = () => {
    console.log("Rotas renderizadas");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Home />} />
                <Route path="/fichapessoa" element={<FichaPessoa />}/>
                <Route path="/fichapet" element={<FichaPet />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
