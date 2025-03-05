import getTokenApi from "./getTokenApi.js";
import obtenerFormatoFecha from "./obtenerFormatoFecha.js";
import tarifaSegunZona from "./tarifaSegunZona.js";
import personaJuridicaTemplate from "./templates/personaJuridica.js";
import personaNaturalTemplate from "./templates/personaNatural.js";
import axios from "axios";
import "dotenv/config";

async function asignarProceso(tipoProceso, datos) {
  try {
    const token = await getTokenApi();
    if (!token || typeof token !== "string") {
      console.error("Token inválido");
      throw new Error("No se pudo obtener un token válido.");
    }

    let fecha = obtenerFormatoFecha();
    let tarifa_segun_zona = tarifaSegunZona(datos.ciudad_inmobiliaria) + "%";

    const END_POINT_CARGAR_PROCESO_API_AUTENTIC = process.env.END_POINT_API_AUTNETIC_SIGN;

    let jsonBody;

    if (tipoProceso === "persona_juridica") {
      jsonBody = personaJuridicaTemplate(datos, tarifa_segun_zona, fecha);
    } else if (tipoProceso === "persona_natural") {
      jsonBody = personaNaturalTemplate(datos, tarifa_segun_zona, fecha);
    } else {
      throw new Error("Tipo de proceso no válido.");
    }

    console.log("jsonBody", JSON.stringify(jsonBody, null, 2));

    const processResponse = await axios.post(
      END_POINT_CARGAR_PROCESO_API_AUTENTIC,
      jsonBody,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return processResponse.data.body.massiveProcessingId;
  } catch (error) {
    console.error("Error en asignarProceso:", error.message);
    throw error;
  }
}

export default asignarProceso;
