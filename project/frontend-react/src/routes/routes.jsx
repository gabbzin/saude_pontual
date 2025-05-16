import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";

const AppRoutes = () => {
  const isAuth = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={isAuth ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;