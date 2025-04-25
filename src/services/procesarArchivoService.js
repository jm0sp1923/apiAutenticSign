// Importamos las funciones que interactúan con la API de HubSpot
import {
  adjuntarArchivoService,
  crearArchivoService,
  crearNotaService,
} from "./hubspotService.js";

// 👉 Esta función automatiza el proceso completo de:
// 1. Subir archivo a HubSpot
// 2. Crear una nota asociada al archivo
// 3. Asociar esa nota con un objeto (Vinculación) en HubSpot
async function procesarArchivoService(id_vinculacion, nombre_inm, num_contrato, fileBuffer) {
  const resultados = []; // Aquí se guardarán los resultados exitosos de cada archivo procesado
  const errores = [];    // Aquí se guardarán los errores que ocurran durante el procesamiento

  // Iteramos sobre cada archivo que recibimos como parámetro
  for (const file of fileBuffer) {
    try {
      // 👉 Paso 1: Cargar el archivo al sistema de archivos de HubSpot
      const archivoResponse = await crearArchivoService(nombre_inm, num_contrato, file);

      // Si falla la subida del archivo, lanzamos un error que será capturado abajo
      if (!archivoResponse.success)
        throw new Error("Error al crear el archivo: " + archivoResponse.error);

      const idArchivo = archivoResponse.data.id; // ID del archivo en HubSpot

      // 👉 Paso 2: Crear una nota con el archivo adjunto
      const notaResponse = await crearNotaService(idArchivo);
      if (!notaResponse.success)
        throw new Error("Error al crear la nota: " + notaResponse.error);

      const idNota = notaResponse.data.id; // ID de la nota creada

      // 👉 Paso 3: Asociar la nota con el objeto vinculación
      const adjuntarResponse = await adjuntarArchivoService(id_vinculacion, idNota);
      if (!adjuntarResponse)
        throw new Error("Error al adjuntar la nota.");

      // Si todo va bien, guardamos los resultados de este archivo
      resultados.push({
        archivo: archivoResponse.data,
        nota: notaResponse.data,
        vinculacion: adjuntarResponse,
      });
    } catch (error) {
      // Si algo falla, registramos el error y el nombre del archivo que lo causó
      errores.push({ archivo: file.name, error: error.message });
    }
  }

  // Devolvemos tanto los resultados exitosos como los errores encontrados
  return { resultados, errores };
}

// Exportamos la función para que pueda ser utilizada en otros módulos
export default procesarArchivoService;
