import { asignarProcesoService, consultarEstadoProcesoService } from "../services/procesoService.js";

const cargarProcesoController = async (req, res) => {
  const { tipo_persona, ...datos } = req.body;

  try {
    const massiveProcessingId = await asignarProcesoService(tipo_persona, datos);
    res.status(200).json({ massiveProcessingId });
  } catch (error) {
    console.error("Error en cargarProceso:", error.message);

    if (error.message === "Tipo de proceso no válido.") {
      return res.status(400).json({ error: error.message }); 
    }

    res.status(500).json({ error: error.message || "No se pudo cargar el proceso" });
  }
};


async function obtenerEstadoProcesoController(req, res) {
  const { massiveProcessingId } = req.body;

  try {
    const { processEstatus, processId } = await consultarEstadoProcesoService(massiveProcessingId);

    console.log("ProcessEstatus:", processEstatus);
    console.log("ProcessId:", processId);

    res.status(200).json({ ProcessEstatus: processEstatus, ProcessId: processId });
  } catch (error) {
    res.status(500).json({ error: "No se pudo consultar el estado del proceso" });
  }
}


export { cargarProcesoController, obtenerEstadoProcesoController };
