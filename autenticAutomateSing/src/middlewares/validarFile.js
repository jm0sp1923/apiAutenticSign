function validarFile(req, res, next) {
    const { processId } = req.body;
    if (!processId || typeof processId !== "string") {
      return res.status(400).json({ error: "El processId es requerido y debe ser un string" });
    }
    next();
  }
  

  export {validarFile};
