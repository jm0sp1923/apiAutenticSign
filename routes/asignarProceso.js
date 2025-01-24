import express from "express";
import asignarProceso from "../utils/asignarProcess.js";

const router = express.Router();

router.post("/cargarProceso", async function (req, res) {
  let {representante_legal,cedula_representante_legal,correo,numero_celular} = req.body;

  console.log("Body: ", req.body);

  if (!correo && !numero_celular) {return res.status(400).json({ error: "Correo o celular deben estar presentes" });}

  if (typeof numero_celular === "string" && numero_celular.startsWith("+57")) {
    numero_celular = numero_celular.substring(3);
  }

  try {
    const massiveProcessingId = await asignarProceso(representante_legal,cedula_representante_legal,correo,numero_celular);
    
    res.status(200).json({massiveProcessingId,});
  } catch (error) {
    console.error("Error al cargar el proceso:", error);
    res.status(500).json({ error: "No se pudo cargar el proceso" });
  }
});

export default router;
