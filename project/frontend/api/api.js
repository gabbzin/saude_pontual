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
    return res.json();
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
    console.log(`1. ENVIANDO DELETE para /profissionais/${idProfissional}`);

    try {
        const res = await fetch(`http://localhost:3001/api/profissionais/${idProfissional}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(`2. RESPOSTA RECEBIDA! Status: ${res.status} (${res.statusText})`);

        // Vamos clonar a resposta para poder ler de duas formas diferentes
        const resClone = res.clone();

        try {
            // Tenta ler o texto da resposta
            const text = await resClone.text();
            console.log("3. CONTEÚDO DA RESPOSTA (TEXTO):", `"${text}"`); // Aspas para ver se é uma string vazia

            // Agora tenta ler como JSON
            const json = await res.json();
            console.log("4. CONTEÚDO DA RESPOSTA (JSON):", json);
            return json; // Retorna o JSON se conseguir ler

        } catch (jsonError) {
            // Se falhar ao ler o JSON (provavelmente porque o corpo é vazio),
            // mas o status for de sucesso, nós consideramos sucesso.
            console.error("5. ERRO AO LER JSON:", jsonError.message);
            if (res.ok) { // res.ok é true para status 200-299
                console.log("6. A RESPOSTA ERA VAZIA, MAS O STATUS FOI OK. Consideramos SUCESSO.");
                return { sucesso: true, message: "Operação bem-sucedida." };
            } else {
                // Se o status for de erro, lançamos um erro.
                throw new Error("Resposta do servidor não era JSON e o status era de erro.");
            }
        }

    } catch (networkError) {
        console.error("ERRO DE REDE:", networkError);
        throw networkError; // Re-lança o erro para o componente pegar
    }
}

// export async function buscarConsultasPet() {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:3001/api/consultas-pet/me", {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.json();
// }
