import getValidToken from "../config/tokenManagerAutentic.js";
import obtenerFormatoFecha from "../utils/obtenerFormatoFecha.js";
import tarifaSegunZona from "../utils/tarifaSegunZona.js";
import personaJuridicaTemplate from "../templates/personaJuridica.js";
import personaNaturalTemplate from "../templates/personaNatural.js";
import axios from "axios";
import "dotenv/config";


async function asignarProcesoService(tipoProceso, datos) {
  const token = await getValidToken();
  try {
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const fecha = obtenerFormatoFecha();
    const tarifa_segun_zona = tarifaSegunZona(datos.ciudad_inmobiliaria) + "%";

    const END_POINT_CARGAR_PROCESO_API_AUTENTIC = process.env.END_POINT_API_AUTNETIC_SIGN;

    let jsonBody;

    switch (tipoProceso) {
      case "persona_juridica":
        jsonBody = personaJuridicaTemplate(datos, tarifa_segun_zona, fecha);
        break;
      case "persona_natural":
        jsonBody = personaNaturalTemplate(datos, tarifa_segun_zona, fecha);
        break;
      default:
        throw new Error("Tipo de proceso no válido.");
    }

    //console.log("jsonBody", JSON.stringify(jsonBody, null, 2));

    const processResponse = await axios.post(
      END_POINT_CARGAR_PROCESO_API_AUTENTIC,
      jsonBody,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    return processResponse.data.body.massiveProcessingId;
  } catch (error) {
    if(error.status === 401){
      throw new Error("Token mal formado o expirado.");
    }
    console.error("Error en asignarProceso:", error.message);
    throw error;
  }
}

async function consultarEstadoProcesoService(massiveProcessingId) {
  const token = await getValidToken();
  try {
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const END_POINT_CONSULTAR_PROCESO_API = process.env.END_POINT_API_AUTNETIC_SIGN;

    const processResponse = await axios.get(
      `${END_POINT_CONSULTAR_PROCESO_API}${massiveProcessingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //console.log("processResponse", JSON.stringify(processResponse.data, null, 2));

    const processEstatus = processResponse.data.body?.processes?.[0]?.status;
    const processId = processResponse.data.body.processes?.[0].processId;

    return { processEstatus, processId };
  } catch (error) {
    console.error("Error al consultar el proceso:", error.message);
    throw error;
  }
}


export {asignarProcesoService,consultarEstadoProcesoService};
