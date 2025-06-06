// Função para validar força da senha
const validarSenha = (senha) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  return regex.test(senha);
};

module.exports = { validarSenha };