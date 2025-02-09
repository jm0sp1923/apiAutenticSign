import { readFileSync, writeFileSync } from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import convertToPdf from "./transFormPdfToBase64.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPdf = join(__dirname, "..", "public");

// Función para reemplazar texto en Word
async function replaceTextInWord(inputPath, outputPath, replacements) {
  console.log("📄 Datos de entrada:", replacements);
  
  try {
    const content = readFileSync(inputPath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      delimiters: { start: "{{", end: "}}" },
    });

    doc.render(replacements);

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    writeFileSync(outputPath, buffer);
    console.log("✅ Documento Word generado:", outputPath);
  } catch (error) {
    console.error("❌ Error al generar el documento Word:", error);
    throw error; // Lanza el error para que pueda ser manejado
  }

  try {
    const result = await convertToPdf(outputPath, outputPdf);
    return result.pdfBase64; // Retorna el Base64 correctamente
  } catch (error) {
    console.error("❌ Error al generar el PDF en base64:", error);
    throw error; // Lanza el error si ocurre
  }
}

export default replaceTextInWord;
