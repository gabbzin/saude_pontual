
// Função para formatar cada palavra do nome em capitalize
const capitalizeEachWord = (str) => {
    if (!str || typeof str !== 'string') return "";
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

module.exports = {
    capitalizeEachWord,
};