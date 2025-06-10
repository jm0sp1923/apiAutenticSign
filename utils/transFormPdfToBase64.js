
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { exec as execCallback } from "child_process";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function convertToPdf(inputPath, outputPdf) {
    const execPromise = promisify(execCallback);

    try {
        // Convertir a PDF usando LibreOffice

        const sofficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;  // Ruta completa al ejecutable
        const command = `${sofficePath} --headless --convert-to pdf "${inputPath}" --outdir "${outputPdf}"`;

        await execPromise(command);

        console.log("✅ Documento convertido a PDF");


        const pathPdf = join(outputPdf, "contrato_generado.pdf");

        // Leer el archivo PDF generado
        const pdfBuffer = readFileSync(pathPdf);

        // Convertir el buffer a base64
        const base64Pdf = pdfBuffer.toString("base64");

        // Crear un archivo .txt con el contenido base64
        const outputBase64File = join(__dirname, "..", "public", "contrato_generado_base64.txt");
        writeFileSync(outputBase64File, base64Pdf);
        console.log("✅ Archivo .txt con PDF en base64 generado:", outputBase64File);

        // Eliminar los archivos generados (PDF y Word)
        unlinkSync(inputPath);  // Eliminar el archivo Word
        unlinkSync(pathPdf);  // Eliminar el archivo PDF
        console.log("✅ Archivos PDF y Word eliminados");

        // Retornar la ruta del archivo .txt con base64
        return {
            txtPath: outputBase64File,
            pdfBase64: base64Pdf
        };
    } catch (err) {
        console.error("❌ Error al convertir a PDF:", err);
        throw err;
    }
}

export default convertToPdf;
