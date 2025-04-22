export default function getDatosEmailRemember(data) {
    try {
      const bodyText = data.body.body;
  
      // Extraer el firmante del <label>
      const matchName = bodyText.match(/<label[^>]*>(.*?)<\/label>/);
      const firmante = matchName ? matchName[1].trim() : null;
  
      // Extraer el ID del proceso desde el link
      const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9]+)\//i);
      const processId = matchProceso ? matchProceso[1] : null;
  
      // Fecha del email
      const fecha = data.body.receivedDateTime || new Date().toISOString();
  
      if (!firmante || !processId || !fecha) {
        throw new Error("Datos incompletos");
      }
  
      return {
        processId,
        firmante,
        fecha
      };
    } catch (error) {
      throw new Error("Error al procesar el cuerpo del email");
    }
  }
  