import axios from "axios";
import getTokenApi from "./getTokenApi.js";

async function consultarProceso(massiveProcessingId) {
  try {

    const token = await getTokenApi();

    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const processResponse = await axios.get(
      `https://qa-mpl.autenticsign.com/v3/signing-process/${massiveProcessingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const processEstatus = processResponse.data.body?.processes?.[0]?.status || "Estado no encontrado";
    return processEstatus;
  } catch (error) {
    console.error("Error al consultar el proceso:", error.message);
    throw error;
  }
}

export default consultarProceso;
