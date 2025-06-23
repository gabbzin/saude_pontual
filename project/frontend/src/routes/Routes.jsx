import { useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
// Contexto
import { AuthContext } from "../contexts/AuthContext";
// Pages
// Admin
import LoginAdm from "../pages/admin/LoginAdm";
import HomeAdm from "../pages/admin/HomeAdm";
// Auth
import Login from "../pages/auth/Login";
import Cadastro from "../pages/auth/Cadastro";
// Client
import Home from "../pages/client/Home";
import FichaPessoa from "../pages/client/FichaPessoa";
import FichaPet from "../pages/client/FichaPet";
import Perfil from "../pages/client/Perfil";
import Historico from "../pages/client/Historico";
// Pros
import HomePro from "../pages/pros/HomePro";
import HistoricoPro from "../pages/pros/HistoricoPro";
import LoginPro from "../pages/pros/LoginPro";

const AppRoutes = () => {
    const { usuario, carregando } = useContext(AuthContext);

    if (carregando) {
        return <div>Segura a emoção que tá carregando</div>;
    }

    const redirectToLogin = <Navigate to="/login" />;

    return (
        <Router>
            <Routes>
                {/* Rotas Públicas de Cadastro e Login */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/loginpro" element={<LoginPro />} />
                <Route path="loginadm" element={<LoginAdm />} />

                {/* Rotas de Administrador */}
                <Route
                    path="homeadm"
                    element={
                        usuario && usuario.role === "admin" ? (
                            <HomeAdm />
                        ) : (
                            <LoginAdm />
                        )
                    }
                />

                {/* Rotas de Profssionais Protegidas (Acessíveis com rule) */}
                <Route path="/homepro" element={usuario && usuario.role === "profissional" ? <HomePro /> : <LoginPro />} />

                <Route path="/historicopro" element={usuario && usuario.role === "profissional" ? <HistoricoPro /> : <LoginPro/>} />

                {/* Rotas de Usuário Protegidas (Acessíveis apenas com o token) */}
                <Route
                    path="/"
                    element={usuario && usuario.role === "client" ? <Home /> : redirectToLogin}
                />
                <Route
                    path="/fichapessoa"
                    element={usuario && usuario.role === "client" ? <FichaPessoa /> : redirectToLogin}
                />
                <Route
                    path="/fichapet"
                    element={usuario && usuario.role === "client" ? <FichaPet /> : redirectToLogin}
                />
                <Route
                    path="/perfil"
                    element={usuario && usuario.role === "client" ? <Perfil /> : redirectToLogin}
                />
                <Route
                    path="/historico"
                    element={usuario && usuario.role === "client" ? <Historico /> : redirectToLogin}
                />

                {/* Rota genérica */}
                <Route path="*" element={redirectToLogin} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
