export default function getDatosEmailRemember(bodyText) {
  try {
    const matchName = bodyText.match(/<label[^>]*>([^<]+)<\/label>/i);
    const firmante = matchName ? matchName[1].trim() : null;

    const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9-]+)\//i);
    const processId = matchProceso ? matchProceso[1] : null;

    const fecha = new Date().toLocaleDateString('es-CO').toString();

    if (!firmante || !processId) {
      throw new Error("Datos incompletos: firmante o ID de proceso no encontrado");
    }

    return {
      processId,
      firmante,
      fecha
    };
  } catch (error) {
    throw new Error(`Error al procesar el cuerpo del email: ${error.message}`);
  }
}
