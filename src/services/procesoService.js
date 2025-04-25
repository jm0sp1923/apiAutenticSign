// Importamos funciones auxiliares y librerías necesarias
import getValidToken from "../config/tokenManagerAutentic.js"; // Función para obtener token válido de autenticación
import obtenerFormatoFecha from "../utils/obtenerFormatoFecha.js"; // Utilidad para formatear fecha
import tarifaSegunZona from "../utils/tarifaSegunZona.js"; // Lógica para calcular tarifa según ciudad
import personaJuridicaTemplate from "../templates/personaJuridica.js"; // Template para persona jurídica
import personaNaturalTemplate from "../templates/personaNatural.js"; // Template para persona natural
import axios from "axios"; // Cliente HTTP
import "dotenv/config"; // Permite usar variables de entorno

// 👉 Servicio para asignar un proceso de firma electrónica en la plataforma Autentic
async function asignarProcesoService(tipo_persona, datos) {
  // Obtenemos el token de autenticación requerido por Autentic
  const token = await getValidToken();

  try {
    // Validación del token obtenido
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    // Obtenemos la fecha actual en formato compatible con Autentic
    const fecha = obtenerFormatoFecha();

    // Calculamos la tarifa basada en la ciudad proporcionada
    const tarifa_segun_zona = tarifaSegunZona(datos.ciudad_inmobiliaria) + "%";

    // Obtenemos el endpoint desde las variables de entorno
    const END_POINT_CARGAR_PROCESO_API_AUTENTIC = process.env.END_POINT_API_AUTNETIC_SIGN;

    let jsonBody;

    // Seleccionamos el cuerpo del request dependiendo si la persona es Natural o Jurídica
    switch (tipo_persona) {
      case "Jurídica":
        jsonBody = personaJuridicaTemplate(datos, tarifa_segun_zona, fecha);
        break;
      case "Natural":
        jsonBody = personaNaturalTemplate(datos, tarifa_segun_zona, fecha);
        break;
      default:
        throw new Error("Tipo de proceso no válido."); // Validación en caso de tipo no soportado
    }

    // Realizamos la solicitud POST para iniciar el proceso de firma
    const processResponse = await axios.post(
      END_POINT_CARGAR_PROCESO_API_AUTENTIC,
      jsonBody,
      {
        headers: { Authorization: `Bearer ${token}` }, // Se incluye el token en el header
      }
    );

    // Retornamos el massive ID del proceso iniciado
    return processResponse.data.body.massiveProcessingId;

  } catch (error) {
    // Validación específica si el token está vencido o es inválido
    if (error.status === 401) {
      throw new Error("Token mal formado o expirado.");
    }
    console.error("Error en asignarProceso:", error.message); // Log del error
    throw error; // Relanzamos el error para que pueda manejarse arriba
  }
}


// 👉 Servicio para consultar el estado de un proceso previamente creado
async function consultarEstadoProcesoService(massiveProcessingId) {
  const token = await getValidToken(); // Nuevamente obtenemos un token válido

  try {
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const END_POINT_CONSULTAR_PROCESO_API = process.env.END_POINT_API_AUTNETIC_SIGN;

    // Hacemos una solicitud GET al endpoint concatenando el ID del proceso
    const processResponse = await axios.get(
      `${END_POINT_CONSULTAR_PROCESO_API}${massiveProcessingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Accedemos al estado del proceso y su ID desde la respuesta
    const processEstatus = processResponse.data.body?.processes?.[0]?.status;
    const processId = processResponse.data.body.processes?.[0].processId;

    // Retornamos el estado y el ID del proceso
    return { processEstatus, processId };

  } catch (error) {
    console.error("Error al consultar el proceso:", error.message); // Log del error
    throw error; // Se relanza para que lo maneje quien llame esta función
  }
}

// Exportamos ambas funciones para ser utilizadas desde otros módulos
export { asignarProcesoService, consultarEstadoProcesoService };
