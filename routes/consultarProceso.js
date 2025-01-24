import express from "express";
import consultarEstadoProceso from "../utils/consultarProcess.js";

const router = express.Router();

router.post("/consultarEstadoProceso", async function (req, res) {
  const { massiveProcessingId } = req.body;
  try {
    const ProcessEstatus = await consultarEstadoProceso(massiveProcessingId);
    res.status(200).json({
      ProcessEstatus: ProcessEstatus,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "No se pudo consultar el estado del proceso" });
  }
});
export default router;
