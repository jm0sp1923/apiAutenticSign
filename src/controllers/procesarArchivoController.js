import procesarArchivoService from "../services/procesarArchivoService.js";
import getFileService from "../services/fileService.js";

async function procesarArchivoController(req, res) {
  try {
    const { id_vinculacion, processId } = req.body;

    const fileBuffer = await getFileService(processId);

    if (!Array.isArray(fileBuffer) || fileBuffer.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron archivos para el proceso.",
      });
    }

    const { resultados, errores } = await procesarArchivoService(id_vinculacion, fileBuffer);

    if (resultados.length === 0) {
      return res.status(500).json({
        success: false,
        message: "No se pudo procesar ningún archivo.",
        errors: errores,
      });
    }

    res.status(207).json({
      success: true,
      message: "Proceso completado con algunos errores.",
      data: resultados,
      errors: errores.length > 0 ? errores : undefined,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}


export { procesarArchivoController };
