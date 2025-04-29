// Función para extraer los datos del correo electrónico relacionado con un proceso de firma
export default function getDatosEmailRemember(bodyText) {
  try {

    // Mostrar el cuerpo del email para su inspección
    console.log("Cuerpo del email:", bodyText);
    
    // Buscar el asunto del correo, que puede ser uno de dos valores posibles
    const asunto = bodyText.match("Proceso de firma completado - Autentic Sign") || bodyText.match("Notificación de firma en Autentic Sign");

    // Si el asunto no es reconocido, se lanza un error
    if (!asunto) {
      throw new Error("El asunto del correo no coincide con el esperado");
    }

    // Si el asunto es "Notificación de firma en Autentic Sign"
    if(asunto == "Notificación de firma en Autentic Sign"){
      // Buscar el nombre del firmante en el cuerpo del correo usando una expresión regular
      const matchName = bodyText.match(/<label[^>]*>([^<]+)<\/label>/i);
      const firmante = matchName ? matchName[1].trim() : null;

      // Buscar el ID del proceso de firma en la URL del correo usando una expresión regular
      const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9-]+)\//i);
      const processId = matchProceso ? matchProceso[1] : null;

      // Obtener la fecha actual en formato 'es-CO' (colombiano)
      const fecha = new Date().toLocaleDateString('es-CO').toString();

      
      // Si falta el nombre del firmante o el ID del proceso, lanzar un error
      if (!firmante || !processId) {
        throw new Error("Datos incompletos: firmante o ID de proceso no encontrado");
      }

      // Retornar los datos extraídos del correo
      return {
        processId,
        firmante,
        fecha,
        asunto
      };
    } else {
      // Si el asunto es "Proceso de firma completado - Autentic Sign"
      // Buscar solo el ID del proceso en la URL
      const matchProceso = bodyText.match(/view-documents-signed\/([a-z0-9-]+)\//i);
      const processId = matchProceso ? matchProceso[1] : null;

      // Obtener la fecha actual en formato 'es-CO' 
      const fecha = new Date().toLocaleDateString('es-CO').toString();

      // Al ser un correo de firma completada, se asigna un firmante predeterminado en este caso a "Cesar Augusto Tezna Castaño"
      return {
        processId,
        "firmante": "Cesar Augusto Tezna Castaño",  // Firmante predeterminado
        fecha,
        asunto
      };
    }

  } catch (error) {
    // Si ocurre un error, lanzar una excepción con el mensaje correspondiente
    throw new Error(`Error al procesar el cuerpo del email: ${error.message}`);
  }
}
