import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function descargarArchivos(archivos) {
    const filePaths = []; 

    for (const archivo of archivos) {
        const { name, url } = archivo;

        try {
            console.log(`Descargando: ${name}`);
            const response = await axios.get(url, { responseType: "stream" });

            const filePath = path.join(__dirname, "../downloads", name);
            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on("finish", resolve);
                writer.on("error", reject);
            });

            console.log(`Descarga completa: ${filePath}`);
            filePaths.push(filePath); 
        } catch (error) {
            console.error(`Error al descargar ${name}:`, error.message);
        }
    }

    return filePaths; 
}

export default descargarArchivos;
