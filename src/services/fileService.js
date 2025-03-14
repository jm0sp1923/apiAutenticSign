import axios from "axios";
import getValidToken from "../config/tokenManagerAutentic.js";
import descargarArchivos from "../utils/descargarArchivo.js";
import "dotenv/config";

async function getFileService(processId) {
  const token = await getValidToken();
  try {
    console.log("Consultando archivos para el processId:", processId);

    const END_POINT_API_GET_FILE = `${process.env.END_POINT_API_GET_FILE}/${processId}`;

    const response = await axios.get(END_POINT_API_GET_FILE, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let files = response.data.body.files;

    let filePath = await descargarArchivos(files);

    return {files: files, filePath: filePath};
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("⚠️ No se encontraron archivos para el processId:", processId);
        return [];
      }
      throw new Error(`Error en la API externa: ${error.response.status} - ${error.response.data.error || error.message}`);
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor externo.");
    } else {
      throw new Error(`Error en la solicitud: ${error.message}`);
    }
  }
}

export default getFileService;
