import { jsPDF } from "jspdf";
import Logo from "../assets/logo_uniceplac.png"; // Importando o logo

const addImageToPDF = (doc, imageUrl, x, y, width, height) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            doc.addImage(img, "PNG", x, y, width, height);
            resolve();
        };
        img.onerror = reject;
    });
};

export const generateSaudePontualPdf = async (
    reportData,
    fileName = "saude_pontual_relatorio.pdf"
) => {
    const doc = new jsPDF();

    let yOffset = 10; // Posição inicial do Y
    const marginX = 15; // Margin do X
    const lineHeight = 7; // Altura da linha para espaçamento

    // --- CABEÇALHO ---
    doc.setFont("Passion One", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0); // Cor preta
    doc.text("SAÚDE PONTUAL", doc.internal.pageSize.getWidth() / 2, yOffset, {
        align: "center",
    });
    yOffset += 15; // Espaço adicional pós-titulo

    const logoWidth = 40;
    const logoHeight = 40;
    const logoX = doc.internal.pageSize.getWidth() - marginX - logoWidth;
    const logoY = 5;

    try {
        await addImageToPDF(doc, Logo, logoX, logoY, logoWidth, logoHeight);
    } catch (error) {
        console.error(error);
    }

    doc.setFont("Arial", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const addListItem = (label, value) => {
        const fullText = `${label}: ${value || ""}`;
        const splitText = doc.splitTextToSize(
            fullText,
            doc.internal.pageSize.getWidth - 2 * marginX - 10
        );
        doc.text(splitText, marginX + 5, yOffset);
        yOffset += splitText.length * lineHeight;
    };

    addListItem("Relatório", reportData);

    doc.save(fileName);
};
