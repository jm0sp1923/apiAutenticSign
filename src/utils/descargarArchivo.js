import axios from "axios"; // Importar axios para realizar solicitudes HTTP

// Función asincrónica para descargar archivos de las URLs proporcionadas
async function descargarArchivos(archivos) {
  const archivosBuffer = []; // Array que almacenará los archivos descargados en forma de buffers

  // Iterar sobre cada archivo en la lista de archivos proporcionada
  for (const archivo of archivos) {
    const { name, url } = archivo; // Desestructurar el nombre y la URL del archivo

    try {
      // Mostrar mensaje de descarga en curso
      console.log(`📥 Descargando: ${name}`);
      
      // Realizar la solicitud GET para obtener el archivo como un buffer (array de bytes)
      const response = await axios.get(url, { responseType: "arraybuffer" });

      // Guardar el archivo descargado en el array de buffers
      archivosBuffer.push({ name, buffer: response.data });
      
      // Mostrar mensaje cuando la descarga sea exitosa
      console.log(`✅ Descarga en buffer completa: ${name}`);
    } catch (error) {
      // Si ocurre un error durante la descarga, mostrar mensaje de error
      console.error(`❌ Error al descargar ${name}:`, error.message);
    }
  }

  // Retornar el array con los archivos descargados o un array vacío si no se descargaron archivos
  return archivosBuffer.length > 0 ? archivosBuffer : []; // ⬅️ Retorna el array de archivos o vacío
}

// Exportar la función para que sea accesible en otros módulos
export default descargarArchivos;
