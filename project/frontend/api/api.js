/* eslint-disable no-unused-vars */
export async function cadastrarUsuario(dados) {
    const res = await fetch(`http://localhost:3001/api/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    return res.json();
}

export async function loginUsuario(dados) {
    const res = await fetch(`http://localhost:3001/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    return res.json();
}

export async function buscarPerfil(token) {
    const res = await fetch("http://localhost:3001/api/perfil", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function cadastrarProfissional(data) {
    // Não precisa de token para cadastrar profissional (admin inicial)
    const res = await fetch(
        "http://localhost:3001/api/profissionais/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    );

    return res.json();
}

export async function loginProfissional(data) {
    const res = await fetch("http://localhost:3001/api/profissionais/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function cadastrarConsulta(data) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/fichapessoa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function atualizarInfoPerfil(dados, token) {
    const res = await fetch(`http://localhost:3001/api/perfil/info`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
    });
    return res.json();
}

export async function buscarHistoricoConsultas() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/consultas/historico", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function adicionarRelatorioConsulta(idConsulta, dados) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/consultas/relatorio/${idConsulta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
    });
    return res.json();
}

export async function loginAdmin(data) {
    const res = await fetch("http://localhost:3001/api/loginadm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function buscarConsultasProfissional() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/consultas/profissional", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function buscarConsultas() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/consultas", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function cancelarConsulta(idConsulta) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/consultas/cancelar/${idConsulta}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    let data;
    try {
        data = await res.json();
    } catch (e) {
        return { error: "Resposta inválida do servidor." };
    }
    if (res.ok && data && data.id) {
        return { id: data.id };
    } else if (data && data.mensagem) {
        return { error: data.mensagem };
    } else if (data && data.error) {
        return { error: data.error };
    } else {
        return { error: "Erro desconhecido ao cancelar consulta." };
    }
}

export async function listarTodosUsuarios() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/usuarios`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    return res.json();
};

export async function deletarProfissional(idProfissional) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`http://localhost:3001/api/profissionais/${idProfissional}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        try {
            const json = await res.json();
            return json; // Retorna o JSON se conseguir ler

        } catch (jsonError) {
            console.error("ERRO AO LER JSON:", jsonError.message);
            if (res.ok) {
                return { sucesso: true, message: "Operação bem-sucedida." };
            } else {
                throw new Error("Resposta do servidor não era JSON e o status era de erro.");
            }
        }

    } catch (networkError) {
        console.error("ERRO DE REDE:", networkError);
        throw networkError;
    }
}

export async function deletarUsuario(idUsuario) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/usuarios/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.status === 204) {
        return { sucesso: true };
    }
    let data;
    try {
        data = await res.json();
    } catch (e) {
        return { error: "Resposta inválida do servidor." };
    }
    if (data && data.mensagem) {
        return { error: data.mensagem };
    }
    return { error: "Erro desconhecido ao deletar usuário." };
}

export async function cadastrarConsultaPet(data) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/pet/fichapet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function buscarConsultasPetUsuario() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/pet/consultas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function cancelarConsultaPet(idConsulta) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/pet/consultas/${idConsulta}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    // Retorna true se deletou com sucesso (204), senão retorna o json de erro
    if (res.status === 204) return true;
    return res.json();
}

export async function buscarDetalhesConsulta(idConsulta) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/consultas/${idConsulta}`, {
        headers: { "Authorization": `Bearer ${token}` },
    });
    return res.json();
}