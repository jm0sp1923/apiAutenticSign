// Middleware para validar que el 'processId' esté presente y sea un string
function validarProcessID(req, res, next) {
  // Desestructuramos 'processId' del cuerpo de la solicitud
  const { processId } = req.body;

  // Comprobamos si 'processId' no está presente o no es un string
  if (!processId || typeof processId !== "string") {
    // Si no cumple, respondemos con un error 400
    return res.status(400).json({ error: "El processId es requerido y debe ser un string" });
  }

  // Si la validación pasa, continuamos con el siguiente middleware o la ruta
  next();
}

// Middleware para validar que el 'massiveProcessingId' esté presente y sea un string
function validarMasiveId(req, res, next) {
  // Desestructuramos 'massiveProcessingId' del cuerpo de la solicitud
  const { massiveProcessingId } = req.body;

  // Comprobamos si 'massiveProcessingId' no está presente o no es un string
  if (!massiveProcessingId || typeof massiveProcessingId !== "string") {
    // Si no cumple, respondemos con un error 400
    return res.status(400).json({ error: "El massiveProcessingId es requerido y debe ser un string" });
  }

  // Si la validación pasa, continuamos con el siguiente middleware o la ruta
  next();
}

// Exportamos ambas funciones para que puedan ser usadas en otras partes de la aplicación
export {validarProcessID, validarMasiveId};
