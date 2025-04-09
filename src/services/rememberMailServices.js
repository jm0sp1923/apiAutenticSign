import "dotenv/config";
import axios from "axios";

const { CLIENT_ID, CLIENT_SECRET, TENANT_ID } = process.env;

async function getToken() {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("scope", "https://graph.microsoft.com/.default");

  const response = await axios.post(tokenUrl, params);
  return response.data.access_token;
}

// HTML como string
let html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Recordatorio de Firma</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #fff;
      border-radius: 8px;
      padding: 30px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2c3e50;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #0078D4;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>¡Hola!</h2>
    <p>
      Este es un recordatorio amable de que aún tienes pendiente la firma de un contrato.
    </p>
    <p>
      Por favor, revisa tus documentos y completa la firma lo antes posible.
    </p>
    <a href="#" class="button">Firmar ahora</a>
    <p class="footer">
      Si ya firmaste este contrato, puedes ignorar este mensaje.
    </p>
  </div>
</body>
</html>
`;

let jsonBody = {
  message: {
    subject: "Recordatorio de Firma",
    body: {
      contentType: "HTML",
      content: html,
    },
    toRecipients: [
      {
        emailAddress: {
          address: "jm0sp@yopmail.com",
        },
      },
    ],
  },
  saveToSentItems: false,
};

async function rememberMail() {
  try {
    const token = await getToken();

    const sender = "juan.munoz@affi.net"; 
    const urlMailSend = `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`;

    const res = await axios.post(urlMailSend, jsonBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Mensaje enviado correctamente", res.data);
  } catch (error) {
    console.error("Error al enviar el correo:");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

rememberMail();
