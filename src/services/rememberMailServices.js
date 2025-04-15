import "dotenv/config";
import axios from "axios";
import getToken from "../config/tokenTenant.js";
import emailRemember from "../templates/templateEmailRemember.js"


async function rememberMail(data) {
  try {
    const {numContrato,nombreCliente,fechaEnvio,processId}  = data
    const token = await getToken();

    const sender = "juan.munoz@affi.net";
    const urlMailSend = `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`;

  
    const htmlContent = emailRemember("  ",numContrato, nombreCliente, fechaEnvio, processId);

    const jsonBody = {
      message: {
        subject: "Recordatorio de Firma",
        body: {
          contentType: "HTML",
          content: htmlContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: "jm0sp1923@gmail.com" ,
            },
          },
        ],
      },
      saveToSentItems: false,
    };

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

//rememberMail();

export default rememberMail;
