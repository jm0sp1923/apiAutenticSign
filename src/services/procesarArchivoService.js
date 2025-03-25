import {
  adjuntarArchivoService,
  crearArchivoService,
  crearNotaService,
} from "./hubspotService.js";

async function procesarArchivoService(id_vinculacion,nombre_inm,num_contrato,fileBuffer) {
  const resultados = [];
  const errores = [];

  for (const file of fileBuffer) {  
    try {
      const archivoResponse = await crearArchivoService(nombre_inm,num_contrato,file);

      if (!archivoResponse.success)
        throw new Error("Error al crear el archivo: " + archivoResponse.error);

      const idArchivo = archivoResponse.data.id;

      const notaResponse = await crearNotaService(idArchivo);
      if (!notaResponse.success)
        throw new Error("Error al crear la nota: " + notaResponse.error);

      const idNota = notaResponse.data.id;

      const adjuntarResponse = await adjuntarArchivoService(id_vinculacion, idNota);
      if (!adjuntarResponse) throw new Error("Error al adjuntar la nota.");

      resultados.push({
        archivo: archivoResponse.data,
        nota: notaResponse.data,
        vinculacion: adjuntarResponse,
      });
    } catch (error) {
      errores.push({ archivo: file.name, error: error.message }); // ⬅️ file.name en lugar de filePath
    }
  }

  return { resultados, errores };
}


export default procesarArchivoService;
