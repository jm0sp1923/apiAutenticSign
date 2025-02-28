import axios from "axios";
import getTokenApi from "./getTokenApi.js";
import "dotenv/config";

async function consultarArchivo(massiveProcessingId) {
  try {
    const token = await getTokenApi();

    console.log("token", token);

    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const END_POINT_API_GET_FILE =
      process.env.END_POINT_API_GET_FILE;

    const processResponse = await axios.get(
      `${END_POINT_API_GET_FILE}${massiveProcessingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const processEstatus =
      processResponse.body ||
      "Estado no encontrado";
    return processEstatus;
  } catch (error) {
    console.error("Error al consultar el proceso:", error.message);
    throw error;
  }
}

export default consultarArchivo;
