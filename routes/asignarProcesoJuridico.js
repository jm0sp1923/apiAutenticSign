import express from "express";
import asignarProceso from "../utils/asignarProcessJuridico.js";

const router = express.Router();

//Asignar proceso persona natural

router.post("/cargarProcesoJuridico", async function (req, res) {
  let {
    numero_de_contrato,
    nombre_inmobiliaria,
    ciudad_inmobiliaria,
    nit_inmobiliaria,
    nombre_representante_legal,
    cedula_representante_legal,
    ciudad_expedicion,
    tarifa_segun_zona,
    numero_celular,
    correo,
  } = req.body;

  if (!correo && !numero_celular) {
    return res
      .status(400)
      .json({ error: "Correo o celular deben estar presentes" });
  }

  if (typeof numero_celular === "string" && numero_celular.startsWith("+57")) {
    numero_celular = numero_celular.substring(3);
  }

  try {
    const massiveProcessingId = await asignarProceso(
      numero_de_contrato,
      nombre_inmobiliaria,
      ciudad_inmobiliaria,
      nit_inmobiliaria,
      nombre_representante_legal,
      cedula_representante_legal,
      ciudad_expedicion,
      tarifa_segun_zona,
      numero_celular,
      correo
    );
    res.status(200).json({ massiveProcessingId });
  } catch (error) {
    console.error("Error al cargar el proceso router:", error.message);
    res.status(500).json({ error: "No se pudo cargar el proceso" });
  }
});

export default router;
