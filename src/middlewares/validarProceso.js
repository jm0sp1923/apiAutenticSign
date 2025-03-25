const validarProceso = (req, res, next) => {
  const { numero_celular, correo } = req.body;
  if (!correo && !numero_celular) {
      return res.status(400).json({ error: "Correo o celular deben estar presentes" });
  }
  if (typeof numero_celular === "string" && numero_celular.startsWith("+57")) {
      req.body.numero_celular = numero_celular.slice(3);
  }
  next();
};

export { validarProceso };
