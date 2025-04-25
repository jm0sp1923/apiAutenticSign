// Importamos las dependencias necesarias
import axios from "axios"; // Para realizar solicitudes HTTP
import getValidToken from "../config/tokenManagerAutentic.js"; // Para obtener el token de autenticación
import descargarArchivos from "../utils/descargarArchivo.js"; // Función para descargar los archivos
import "dotenv/config"; // Para cargar las variables de entorno

// Función principal para consultar y descargar archivos de un proceso
async function getFileService(processId) {
  // Obtenemos un token válido para la autenticación
  const token = await getValidToken();

  try {
    // Mostramos en consola el processId que estamos consultando
    console.log("Consultando archivos para el processId:", processId);

    // Construimos la URL del endpoint para consultar los archivos usando el processId
    const END_POINT_API_GET_FILE = `${process.env.END_POINT_API_GET_FILE}/${processId}`;

    // Realizamos una solicitud GET al endpoint de la API
    const response = await axios.get(END_POINT_API_GET_FILE, {
      headers: { Authorization: `Bearer ${token}` }, // Agregamos el token en los headers de la solicitud
    });

    // Extraemos los archivos de la respuesta, si existen
    let files = response.data.body.files || []; 
    console.log("Archivos encontrados:", files);

    // Llamamos a la función 'descargarArchivos' para obtener el buffer de los archivos
    let fileBuffer = await descargarArchivos(files);
    
    // Verificamos si 'fileBuffer' es un array y lo retornamos, en caso contrario, retornamos un array vacío
    return Array.isArray(fileBuffer) ? fileBuffer : []; 
  } catch (error) {
    // Si ocurre un error durante la solicitud o procesamiento, lo mostramos en consola
    console.error("❌ Error en getFileService:", error.message);
    
    // Retornamos un array vacío en caso de error para no interrumpir el flujo
    return []; // Retornar un array vacío en caso de error
  }
}

// Exportamos la función para que pueda ser utilizada en otras partes de la aplicación
export default getFileService;
