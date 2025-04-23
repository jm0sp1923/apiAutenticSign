import getValidToken from "../config/tokenManagerAutentic.js";
import obtenerFormatoFecha from "../utils/obtenerFormatoFecha.js";
import tarifaSegunZona from "../utils/tarifaSegunZona.js";
import personaJuridicaTemplate from "../templates/personaJuridica.js";
import personaNaturalTemplate from "../templates/personaNatural.js";
import axios from "axios";
import "dotenv/config";


async function asignarProcesoService(tipo_persona, datos) {
  
  //Obtener Token de Autenticación Para el API de Autentic
  const token = await getValidToken();
  
  try {
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    //Funcion para obtener la fecha en el formato requerido para la generarcion del contrato
    const fecha = obtenerFormatoFecha();
    
    //Funcion para obtener la tarifa dependiendo de la ciudad requerido para la generarcion del contrato
    const tarifa_segun_zona = tarifaSegunZona(datos.ciudad_inmobiliaria) + "%";

    const END_POINT_CARGAR_PROCESO_API_AUTENTIC = process.env.END_POINT_API_AUTNETIC_SIGN;

    let jsonBody;

    //Seleccionar el template dependiendo del tipo de persona
    switch (tipo_persona) {
      case "Jurídica":
        jsonBody = personaJuridicaTemplate(datos, tarifa_segun_zona, fecha);
        break;
      case "Natural":
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


//Funcion para consultar el estado del proceso
async function consultarEstadoProcesoService(massiveProcessingId) {
  
  //Obtener Token de Autenticación Para el API de Autentic
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

//retorna el estado del proceso [ UNSIGNED ||SIGNED || WAITING_FOR_SIGNATURES ] y el id del proceso
  
    return { processEstatus, processId };
  } catch (error) {
    console.error("Error al consultar el proceso:", error.message);
    throw error;
  }
}


export {asignarProcesoService,consultarEstadoProcesoService};
