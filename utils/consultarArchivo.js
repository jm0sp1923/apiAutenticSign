import axios from "axios";
import getTokenApi from "./getTokenApi.js";
import "dotenv/config";

async function consultarArchivo(processId) {
  try {
    const token = await getTokenApi();

    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    console.log(processId);

    const END_POINT_API_GET_FILE = `${process.env.END_POINT_API_GET_FILE}/${processId}`;

    const processResponse = await axios.get(END_POINT_API_GET_FILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fileProcess = processResponse.data.body.files;
    return fileProcess;
  } catch (error) {
    throw error;
  }
}

export default consultarArchivo;
