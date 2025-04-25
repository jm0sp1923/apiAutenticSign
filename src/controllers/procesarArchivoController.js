// Importamos el servicio 'procesarArchivoService' que contiene la lógica para procesar los archivos
import procesarArchivoService from "../services/procesarArchivoService.js";
// Importamos el servicio 'getFileService' que se utiliza para obtener el archivo asociado al proceso
import getFileService from "../services/fileService.js";

// Controlador para procesar los archivos asociados a un proceso específico
async function procesarArchivoController(req, res) {
  try {
    // Desestructuramos los parámetros necesarios del cuerpo de la solicitud (req.body)
    const { id_vinculacion, nombre_inm, num_contrato, processId } = req.body;

    // Usamos 'getFileService' para obtener el archivo (como un buffer) basado en el 'processId'
    const fileBuffer = await getFileService(processId);

    // Verificamos si no se encontraron archivos para el proceso
    if (!Array.isArray(fileBuffer) || fileBuffer.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron archivos para el proceso.",
      });
    }

    // Llamamos al servicio 'procesarArchivoService' para procesar el archivo con los parámetros recibidos
    const { resultados, errores } = await procesarArchivoService(id_vinculacion, nombre_inm, num_contrato, fileBuffer);

    // Si no se procesaron archivos correctamente, respondemos con un error
    if (resultados.length === 0) {
      return res.status(500).json({
        success: false,
        message: "No se pudo procesar ningún archivo.",
        errors: errores,
      });
    }

    // Si se procesaron archivos, pero con algunos errores, respondemos con código 207 (Multi-Status)
    res.status(207).json({
      success: true,
      message: "Proceso completado con algunos errores.",
      data: resultados,
      errors: errores.length > 0 ? errores : undefined, // Solo enviamos los errores si los hay
    });
  } catch (error) {
    // En caso de error inesperado, respondemos con código 400 (solicitud incorrecta)
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

// Exportamos el controlador para su uso en las rutas
export { procesarArchivoController };
