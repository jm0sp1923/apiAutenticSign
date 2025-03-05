import express from "express";
import consultarArchivo from "../utils/consultarArchivo.js";

const router = express.Router();

router.post("/consultarArchivo", async function (req, res) {
  const { processId } = req.body;

  try {
    const files = await consultarArchivo(processId);
    
    console.log("Respuesta final:", files);
    
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error en la consulta de archivos:", error);
    
    res.status(500).json({ error: "No se pudo consultar los archivos del proceso" });
  }
});


export default router;
    