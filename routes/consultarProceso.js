import express from "express";
import consultarEstadoProceso from "../utils/consultarProcess.js";

const router = express.Router();

router.post("/consultarEstadoProceso", async function (req, res) {
  const { massiveProcessingId } = req.body;

  console.log("massiveProcessingId", massiveProcessingId);

  try {
    const { processEstatus, processId } = await consultarEstadoProceso(massiveProcessingId);
    
    console.log("ProcessEstatus", processEstatus);
    console.log("ProcessId", processId);

    res.status(200).json({ ProcessEstatus: processEstatus, ProcessId: processId });
  } catch (error) {
    res.status(500).json({ error: "No se pudo consultar el estado del proceso" });
  }
});

export default router;
