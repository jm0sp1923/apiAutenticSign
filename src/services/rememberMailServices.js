import "dotenv/config";
import axios from "axios";
import getToken from "../config/tokenTenant.js";
import emailRemember from "../templates/templateEmailRemember.js";
import Process from "../models/processModel.js";
import Gerencias from "../models/gerenciasModel.js";

async function rememberMail(data) {
  try {
    const { numContrato, nombreCliente, fechaEnvio, processId } = data;
    const token = await getToken();
    const proceso = await Process.findOne({ processId });

    console.log("Process base de datos", proceso);

    if (!proceso) {
      console.error("Proceso no encontrado");
      return;
    }

    let emailDestino = "";
    let nameDestinatario = "";
    if (proceso.firmante === "Lilian Paola Holguín Orrego") {
      // Si el firmante es Lilian, buscamos a Cesar
      const gerencia = await Gerencias.findOne({
        name: "Cesar Augusto Tezna Castaño",
      });
      emailDestino = gerencia?.email;
      nameDestinatario = "Cesar Augusto Tezna Castaño";
    } else {
      // En cualquier otro caso, buscamos a Lilian
      const gerencia = await Gerencias.findOne({
        name: "Lilian Paola Holguín Orrego",
      });
      emailDestino = gerencia?.email;
      nameDestinatario = "Lilian Paola Holguín Orrego";
    }

    const sender = "juan.munoz@affi.net";
    const urlMailSend = `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`;

    const htmlContent = emailRemember(
      nameDestinatario,
      numContrato,
      nombreCliente,
      fechaEnvio,
      processId
    );

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
              address: emailDestino,
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
