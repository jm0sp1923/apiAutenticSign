export default function getDatosEmailRemember(bodyText) {
  try {

    console.log("Cuerpo del email:", bodyText);
    const asunto = bodyText.match("Proceso de firma completado - Autentic Sign") || bodyText.match("Notificación de firma en Autentic Sign")

    if (!asunto) {
      throw new Error("El asunto del correo no coincide con el esperado");
    }

    if(asunto == "Notificación de firma en Autentic Sign"){
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
  }else{

    const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9-]+)\//i);
    const processId = matchProceso ? matchProceso[1] : null;
    const fecha = new Date().toLocaleDateString('es-CO').toString();

    return {
      processId,
      "firmante": "Cesar Augusto Tezna Castaño",
      fecha
    };
  }


} catch (error) {
    throw new Error(`Error al procesar el cuerpo del email: ${error.message}`);
  }
}
