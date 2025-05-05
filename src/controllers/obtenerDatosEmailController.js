// Importamos el modelo 'Process' para interactuar con la base de datos
import Process from "../models/processModel.js";
// Importamos la función 'getDatosEmailRemember' para obtener los datos del correo
import getDatosEmailRemember from "../utils/getDatosEmailRemember.js";

// Controlador para obtener y guardar los datos del proceso relacionados con el correo
async function obtenerDatosEmailController(req, res) {
  try {
    const processEmail = getDatosEmailRemember(req.body);

    await Process.findOneAndUpdate(
      { processId: processEmail.processId },
      {
        firmante: processEmail.firmante,
        fecha: processEmail.fecha,
        asunto: processEmail.asunto,
        modificado: new Date().toLocaleDateString('es-CO').toString()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Datos del proceso guardados correctamente" });

  } catch (error) {
    // Comprobamos si el mensaje incluye el texto esperado
    if (error.message.includes("El asunto del correo no coincide")) {
      return res.status(200).json({ message: "Peticion fallida", error: error.message });
    }

    console.error(error.message);
    res.status(400).json({ message: "Datos del proceso mal formados", error: error.message });
  }
}

// Exportamos el controlador para usarlo en las rutas
export default obtenerDatosEmailController;
