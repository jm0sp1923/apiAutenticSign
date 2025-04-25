// Importamos los servicios que contienen la lógica para asignar procesos y consultar el estado del proceso
import { asignarProcesoService, consultarEstadoProcesoService } from "../services/procesoService.js";

// Controlador para cargar un nuevo proceso
const cargarProcesoController = async (req, res) => {
  // Desestructuramos el cuerpo de la solicitud para obtener 'tipo_persona' y 'datos'
  const { tipo_persona, ...datos } = req.body;

  try {
    // Llamamos al servicio 'asignarProcesoService' para crear el proceso masivo basado en los datos recibidos
    const massiveProcessingId = await asignarProcesoService(tipo_persona, datos);

    // Si el proceso es exitoso, respondemos con el ID del procesamiento masivo
    res.status(200).json({ massiveProcessingId });
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola
    console.error("Error en cargarProceso:", error.message);

    // Si el error es por un tipo de proceso no válido, respondemos con un error 400
    if (error.message === "Tipo de proceso no válido.") {
      return res.status(400).json({ error: error.message }); 
    }

    // Si el error es otro, respondemos con un error 500 indicando que no se pudo cargar el proceso
    res.status(500).json({ error: error.message || "No se pudo cargar el proceso" });
  }
};

// Controlador para consultar el estado de un proceso
async function obtenerEstadoProcesoController(req, res) {
  // Obtenemos el ID del proceso masivo desde el cuerpo de la solicitud
  const { massiveProcessingId } = req.body;

  try {
    // Llamamos al servicio 'consultarEstadoProcesoService' para obtener el estado del proceso
    const { processEstatus, processId } = await consultarEstadoProcesoService(massiveProcessingId);

    // Mostramos el estado del proceso y el ID en la consola para depuración
    //console.log("ProcessEstatus:", processEstatus);
    //console.log("ProcessId:", processId);

    // Respondemos con el estado y el ID del proceso
    res.status(200).json({ ProcessEstatus: processEstatus, ProcessId: processId });
  } catch (error) {
    // Si ocurre un error, respondemos con un mensaje de error 500
    res.status(500).json({ error: "No se pudo consultar el estado del proceso" });
  }
}

// Exportamos ambos controladores para usarlos en las rutas
export { cargarProcesoController, obtenerEstadoProcesoController };
