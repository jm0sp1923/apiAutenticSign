import express from "express";
import axios from "axios";
import "dotenv/config";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index", { title: "Express" });
});


router.post("/cargarProceso", async function (req, res, next) {
  const { name, lastName, identification, email, phone } = req.body;

  // Obtén el token utilizando el endpoint /obtenerTokenApi
  const tokenRequestBody = {
    audience: process.env.AUDIENCE,
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  try {
    // Solicita el token primero
    const tokenResponse = await axios.post(
      "https://authorizer.autenticsign.com/v2/authorizer/getToken",
      tokenRequestBody
    );

    const token = tokenResponse.data.access_token;


    // Ahora crea el proceso
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
              name: name,
              lastName: lastName,
              documentType: "CC",
              identification: identification,
              email: email,
              phone: phone,
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

    const processResponse = await axios.post(
      "https://qa-mpl.autenticsign.com/v3/signing-process/",
      jsonBody,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
        },
      }
    );    

    res.status(200).send({status:200, massiveProcessingId: processResponse.data.body.massiveProcessingId});
  } catch (error) {
    console.error("Error al cargar el proceso:", error);

    // Envía un error al cliente
    res.status(500).json({ error: "No se pudo cargar el proceso" });
  }
});

export default router;
