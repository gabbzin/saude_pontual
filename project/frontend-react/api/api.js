export async function cadastrarUsuario(dados) {
  const res = await fetch(`http://localhost:3001/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return res.json();
}

export async function loginUsuario(dados) {
  const res = await fetch(`http://localhost:3001/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return res.json();
}

export async function buscarPerfil(token) {
  const res = await fetch('http://localhost:3001/api/perfil', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}