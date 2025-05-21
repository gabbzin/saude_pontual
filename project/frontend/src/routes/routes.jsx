import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import FichaPessoa from "../pages/FichaPessoa";
import FichaPet from "../pages/FichaPet";

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkToken);
    checkToken();

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/fichapessoa" element={isAuth ? <FichaPessoa /> : <Navigate to="login"/>}/>
        <Route path="/fichapet" element={isAuth ? <FichaPet /> : <Navigate to="login"/>}/>
        <Route path="*" element={<Navigate to={isAuth ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;