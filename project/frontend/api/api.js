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