import express from "express";
import getTokenApi from "../utils/getTokenApi.js";
import axios from "axios";

const router = express.Router();

router.post("/consultarEstadoProceso", async function (req, res, next) {
  const { massiveProcessingId } = req.body;

  console.log("massiveProcessingId: ", massiveProcessingId);

  try {
    // Get the token from the async function
    const token = await getTokenApi();
    // Verify the token is valid
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    // Make the API request with the correct Authorization header
    const processResponse = await axios.get(
      `https://qa-mpl.autenticsign.com/v3/signing-process/${massiveProcessingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Correct format for the Authorization header
        },
      },
      
    );


    res.status(200).json({
      ProcessEstatus: processResponse.data.body.processes[0]?.status || "Desconocido"
    });
  } catch (error) {
    console.error("Error al consultar el estado del proceso:", error.message || error);
    res.status(500).json({ error: "No se pudo consultar el estado del proceso" });
  }
});

export default router;
