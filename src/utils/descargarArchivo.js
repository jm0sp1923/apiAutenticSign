import axios from "axios";

async function descargarArchivos(archivos) {
    const archivosBuffer = [];
  
    for (const archivo of archivos) {
      const { name, url } = archivo;
  
      try {
        console.log(`📥 Descargando: ${name}`);
        const response = await axios.get(url, { responseType: "arraybuffer" });
  
        archivosBuffer.push({ name, buffer: response.data });
        console.log(`✅ Descarga en buffer completa: ${name}`);
      } catch (error) {
        console.error(`❌ Error al descargar ${name}:`, error.message);
      }
    }
  
    return archivosBuffer.length > 0 ? archivosBuffer : []; // ⬅️ Retornar un array vacío si no hay archivos descargados
  }


export default descargarArchivos;
