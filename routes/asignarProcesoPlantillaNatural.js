import express from "express";
import asignarProceso from "../utils/asignarProcessPlantillaNatural.js";

const router = express.Router();

//Asignar proceso persona natural

router.post("/cargarProcesoPlantilla", async function (req, res) {
  let {
    numero_de_contrato,
    nombre_persona_natural,
    ciudad_inmobiliaria,
    cedula,
    tarifa_segun_zona,
    nombre_representante_legal,
    cedula_representante_legal,
    nombre_establecimiento_comercio,
    numero_celular,
    correo,
  } = req.body;

  console.log(req)


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
      nombre_persona_natural,
      ciudad_inmobiliaria,
      cedula,
      tarifa_segun_zona,
      nombre_representante_legal,
      cedula_representante_legal,
      nombre_establecimiento_comercio,
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
