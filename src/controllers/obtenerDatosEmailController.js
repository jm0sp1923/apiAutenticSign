import Process from "../models/processModel.js";
import getDatosEmailRemember from "../utils/getDatosEmailRemember.js";

async function obtenerDatosEmailController(req, res) {
  try {
    const processEmail = getDatosEmailRemember(req.body);

    console.log(processEmail);

    await Process.findOneAndUpdate(
      { processId: processEmail.processId },
      {
        firmante: processEmail.firmante,
        fecha: processEmail.fecha
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Datos del proceso guardados correctamente" });

  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Datos del proceso mal formados", error: error.message });
  }
}

export default obtenerDatosEmailController;
