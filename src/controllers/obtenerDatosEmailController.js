// Importamos el modelo 'Process' para interactuar con la base de datos
import Process from "../models/processModel.js";
// Importamos la función 'getDatosEmailRemember' para obtener los datos del correo
import getDatosEmailRemember from "../utils/getDatosEmailRemember.js";

// Controlador para obtener y guardar los datos del proceso relacionados con el correo
async function obtenerDatosEmailController(req, res) {
  try {
    // Usamos la función 'getDatosEmailRemember' para extraer los datos del cuerpo de la solicitud
    const processEmail = getDatosEmailRemember(req.body);

    // Actualizamos o insertamos un nuevo documento en la colección de 'Procesos'
    // Usamos 'findOneAndUpdate' para buscar el proceso por 'processId' y luego actualizar sus datos
    await Process.findOneAndUpdate(
      { processId: processEmail.processId }, // Filtro de búsqueda por 'processId'
      {
        firmante: processEmail.firmante,  // Actualizamos el 'firmante' del proceso
        fecha: processEmail.fecha,        // Actualizamos la 'fecha' del proceso
        asunto: processEmail.asunto // Actualizamos el 'asunto' del proceso
      },
      { upsert: true, new: true } // 'upsert' crea un nuevo documento si no se encuentra el proceso
    );

    // Si todo es exitoso, respondemos con un mensaje de éxito
    res.status(200).json({ message: "Datos del proceso guardados correctamente" });

  } catch (error) {
    // Si hay un error, mostramos el mensaje del error en la consola para depuración
    console.error(error.message);

    // Respondemos con un error 400 si los datos del proceso no son válidos o están mal formados
    res.status(400).json({ message: "Datos del proceso mal formados", error: error.message });
  }
}

// Exportamos el controlador para usarlo en las rutas
export default obtenerDatosEmailController;
