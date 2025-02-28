import express from "express";
import consultarArchivo from "../utils/consultarArchivo.js";

const router = express.Router();

router.post("/consultarArchivo", async function (req, res) {
  const { massiveProcessingId } = req.body;

  console.log("massiveProcessingId", massiveProcessingId);

  try {
    const ProcessEstatus = await consultarArchivo(massiveProcessingId);
    console.log("ProcessEstatus", ProcessEstatus);
    res.status(200).json({ProcessEstatus: ProcessEstatus,});
  } catch (error) {
    res.status(500).json({ error: "No se pudo consultar el estado del proceso" });
  }
});
export default router;
    