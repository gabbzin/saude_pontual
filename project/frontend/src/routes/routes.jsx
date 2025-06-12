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

const AppRoutes = () => {
    const { usuario, carregando } = useContext(AuthContext);

    if (carregando) {
        return <div>Segura a emoção que tá carregando</div>;
    }

    const redirectToLogin = <Navigate to="/login" />;

    return (
        <Router>
            <Routes>
                {/* Rotas de Cadastro e Login */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Rotas de Administrador */}
                <Route path="loginadm" element={<LoginAdm />} />

                <Route path="homeadm" element={<HomeAdm />} />

                {/* Rotas de Profssionais Protegidas (Acessíveis com rule) */}
                <Route path="/homepro" element={<HomePro />} />

                <Route path="/historicopro" element={<HistoricoPro />} />

                {/* Rotas de Usuário Protegidas (Acessíveis apenas com o token) */}
                <Route
                    path="/"
                    element={usuario ? <Home /> : redirectToLogin}
                />
                <Route
                    path="/fichapessoa"
                    element={usuario ? <FichaPessoa /> : redirectToLogin}
                />
                <Route
                    path="/fichapet"
                    element={usuario ? <FichaPet /> : redirectToLogin}
                />
                <Route
                    path="/perfil"
                    element={usuario ? <Perfil /> : redirectToLogin}
                />
                <Route
                    path="/historico"
                    element={usuario ? <Historico /> : redirectToLogin}
                />

                {/* Rota genérica */}
                <Route path="*" element={redirectToLogin} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
