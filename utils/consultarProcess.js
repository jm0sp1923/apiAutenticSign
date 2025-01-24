import axios from "axios";
import getTokenApi from "./getTokenApi.js";
import "dotenv/config";

async function consultarProceso(massiveProcessingId) {
  try {
    const token = await getTokenApi();

    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const END_POINT_CONSULTAR_PROCESO_API_AUTNETIC_SIGN =
      process.env.END_POINT_API_AUTNETIC_SIGN;

    const processResponse = await axios.get(
      `${END_POINT_CONSULTAR_PROCESO_API_AUTNETIC_SIGN}${massiveProcessingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const processEstatus =
      processResponse.data.body?.processes?.[0]?.status ||
      "Estado no encontrado";
    return processEstatus;
  } catch (error) {
    console.error("Error al consultar el proceso:", error.message);
    throw error;
  }
}

export default consultarProceso;
