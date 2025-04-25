// Middleware para validar y procesar el 'numero_celular' y 'correo' en la solicitud
const validarProceso = (req, res, next) => {
  // Extraemos 'numero_celular' y 'correo' del cuerpo de la solicitud
  const { numero_celular, correo } = req.body;

  // Verificamos si ni 'correo' ni 'numero_celular' están presentes
  if (!correo && !numero_celular) {
    // Si ambos están ausentes, respondemos con un error 400
    return res.status(400).json({ error: "Correo o celular deben estar presentes" });
  }

  // Verificamos si 'numero_celular' es un string y comienza con "+57" (indicativo de Colombia)
  if (typeof numero_celular === "string" && numero_celular.startsWith("+57")) {
    // Si es así, eliminamos el indicativo "+57" y actualizamos el 'numero_celular' en el cuerpo de la solicitud
    req.body.numero_celular = numero_celular.slice(3); // Quitamos el primer tres caracteres ("+57")
  }

  // Continuamos con el siguiente middleware o la ruta
  next();
};

// Exportamos la función para que pueda ser utilizada en otras partes de la aplicación
export { validarProceso };
