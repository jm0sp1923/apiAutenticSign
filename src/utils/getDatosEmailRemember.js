// Función para extraer los datos del correo electrónico relacionado con un proceso de firma
export default function getDatosEmailRemember(bodyText) {
  try {
    console.log("Cuerpo del email:", bodyText);

    let asunto = null;

    if (bodyText.includes("Proceso de firma completado - Autentic Sign")) {
      asunto = "Proceso de firma completado - Autentic Sign";
    } else if (bodyText.includes("Notificación de firma en Autentic Sign")) {
      asunto = "Notificación de firma en Autentic Sign";
    } else {
      throw new Error("El asunto del correo no coincide con los casos esperados");
    }

    const fecha = new Date().toLocaleDateString('es-CO').toString();

    if (asunto === "Notificación de firma en Autentic Sign") {
      const matchName = bodyText.match(/<label[^>]*>([^<]+)<\/label>/i);
      const firmante = matchName ? matchName[1].trim() : null;

      const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9-]+)\//i);
      const processId = matchProceso ? matchProceso[1] : null;

      if (!firmante || !processId) {
        throw new Error("Datos incompletos: firmante o ID de proceso no encontrado");
      }

      return { processId, firmante, fecha, asunto };
    }

    // Para asunto "Proceso de firma completado - Autentic Sign"
    const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9-]+)\//i);
    const processId = matchProceso ? matchProceso[1] : null;

    return {
      processId,
      firmante: "Cesar Augusto Tezna Castaño",
      fecha,
      asunto
    };

  } catch (error) {
    throw new Error(error.message);
  }
}
