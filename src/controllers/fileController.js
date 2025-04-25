// Importamos el servicio que maneja la consulta de archivos
import getFileService from "../services/fileService.js";

// Controlador asíncrono para consultar los archivos de un proceso
export async function consultarArchivoController(req, res) {
  // Extraemos 'processId' del cuerpo de la solicitud
  const { processId } = req.body;

  try {
    // Llamamos al servicio 'getFileService' pasando 'processId' como argumento
    // Este servicio devuelve los archivos asociados al proceso con el id proporcionado
    const files = await getFileService(processId);
    
    // Si la consulta es exitosa, respondemos con los archivos encontrados
    res.status(200).json({ files });
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola para depuración
    console.error("❌ Error en la consulta de archivos:", error.message);

    // Respondemos con un error 500 si no se pudieron consultar los archivos
    res.status(500).json({ error: "No se pudo consultar los archivos del proceso" });
  }
}

// Exportamos el controlador para usarlo en las rutas
export default { consultarArchivoController };
