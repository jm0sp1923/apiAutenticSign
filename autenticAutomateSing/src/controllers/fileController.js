import getFileService from "../services/fileService.js";

export async function consultarArchivoController(req, res) {
  const { processId } = req.body;

  try {
    const files = await getFileService(processId);
    res.status(200).json({ files });
  } catch (error) {
    console.error("❌ Error en la consulta de archivos:", error.message);
    res.status(500).json({ error: "No se pudo consultar los archivos del proceso" });
  }
}

export default { consultarArchivoController };
