function validarProcessID(req, res, next) {
    const { processId } = req.body;
    if (!processId || typeof processId !== "string") {
      return res.status(400).json({ error: "El processId es requerido y debe ser un string" });
    }
    next();
  }
  
  function validarMasiveId(req, res, next) {
    const { massiveProcessingId } = req.body;
    if (!massiveProcessingId || typeof massiveProcessingId !== "string") {
      return res.status(400).json({ error: "El massiveProcessingId es requerido y debe ser un string" });
    }
    next();
  }

  export {validarProcessID,validarMasiveId};
