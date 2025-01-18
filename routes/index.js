import express from "express";
import axios from "axios";
import "dotenv/config";

import getTokenApi from "../utils/getTokenApi.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Hello World" });
});

router.post("/cargarProceso", async function (req, res, next) {
  const { representante_legal, cedula_representante_legal, correo, numero_celular } = req.body;

  console.log("Variables: ", representante_legal, cedula_representante_legal, correo, numero_celular);

  if(!representante_legal || !cedula_representante_legal || !correo || !numero_celular) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const jsonBody = {
      sendCompletionNotification: true,
      emailForNotification: "juan.munoz@affi.net",
      processes: [
        {
          enterpriseId: "9000533702",
          senderEmail: "juan.munoz@affi.net",
          senderIdentification: "1109184891",
          signers: [
            {
              name: representante_legal,
              documentType: "CC",
              identification: cedula_representante_legal,
              email: correo,
              phone: numero_celular,
              role: "APPROVER",
              authMethods: ["OTP"],
            },
          ],
          documents: [
            {
              content: "",
              fileName: "test.pdf",
            },
          ],
          subject: "Asunto-prueba de api",
          message: "Buen día, remito prueba de firma.",
          order: "true",
          expirationDate: "",
        },
      ],
    };

    // Esperar el token de la función asíncrona
    const token = await getTokenApi();

    // Verificar si el token fue obtenido exitosamente
    if (!token || typeof token !== "string") {
      throw new Error("No se pudo obtener un token válido.");
    }

    const processResponse = await axios.post(
      "https://qa-mpl.autenticsign.com/v3/signing-process/",
      jsonBody,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    res.status(200).json({
      massiveProcessingId: processResponse.data.body.massiveProcessingId,
    });
  } catch (error) {
    console.error("Error al cargar el proceso:", error);
    res.status(500).json({ error: "No se pudo cargar el proceso" });
  }
});


export default router;
