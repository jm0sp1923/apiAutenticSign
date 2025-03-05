import express from "express";
import asignarProceso from "../utils/asignarProcess.js";

const router = express.Router();

router.post("/cargarProceso", async function (req, res) {
  const { tipo_proceso, numero_celular, correo, ...datos } = req.body;

  // Validaciones generales
  if (!correo && !numero_celular) {
    return res.status(400).json({ error: "Correo o celular deben estar presentes" });
  }

  // Formatear número celular si es necesario
  let numeroCelularFormateado = numero_celular || "";
  if (typeof numeroCelularFormateado === "string" && numeroCelularFormateado.startsWith("+57")) {
    numeroCelularFormateado = numeroCelularFormateado.substring(3);
  }

  // Agregar los datos formateados
  datos.numero_celular = numeroCelularFormateado;
  datos.correo = correo;

  try {
    const massiveProcessingId = await asignarProceso(tipo_proceso, datos);
    res.status(200).json({ massiveProcessingId });
  } catch (error) {
    console.error("Error al cargar el proceso:", error.message);
    res.status(500).json({ error: "No se pudo cargar el proceso" });
  }
});

export default router;
