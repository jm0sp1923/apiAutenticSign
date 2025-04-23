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

    let files = response.data.body.files || []; 
    console.log("Archivos encontrados:", files);

    let fileBuffer = await descargarArchivos(files);
    
    return Array.isArray(fileBuffer) ? fileBuffer : []; 
  } catch (error) {
    console.error("❌ Error en getFileService:", error.message);
    return []; // Retornar un array vacío en caso de error
  }
}


export default getFileService;
