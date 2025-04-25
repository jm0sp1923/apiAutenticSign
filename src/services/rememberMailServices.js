import "dotenv/config";
import axios from "axios";
import getToken from "../config/tokenTenant.js";
import emailRemember from "../templates/templateEmailRemember.js";
import Procesos from "../models/processModel.js";
import Gerencias from "../models/gerenciasModel.js";

async function rememberMail(data) {
  try {

    // Validar que los datos necesarios estén presentes para la creación del correo
    const { numContrato, nombreCliente, processId } = data;

    // Obtener token para enviar correo
    const token = await getToken();

    // Buscar el proceso por ID
    const proceso = await Procesos.findOne({ processId });
    if (!proceso) {
      throw new Error("Proceso no encontrado.");
    }

    let emailDestino = "";
    let nameDestinatario = "";

    // Determinar destinatario del recordatorio
    if (proceso.firmante === "Lilian Paola Holguín Orrego") {
      const gerencia = await Gerencias.findOne({ name: "Cesar Augusto Tezna Castaño" });
      if (!gerencia || !gerencia.email) {
        throw new Error("No se encontró el email del destinatario (Cesar).");
      }
      emailDestino = gerencia.email;
      nameDestinatario = "Cesar Augusto Tezna Castaño";
    } else {
      const gerencia = await Gerencias.findOne({ name: "Lilian Paola Holguín Orrego" });
      if (!gerencia || !gerencia.email) {
        throw new Error("No se encontró el email del destinatario (Lilian).");
      }
      emailDestino = gerencia.email;
      nameDestinatario = "Lilian Paola Holguín Orrego";
    }

    // Construcción del cuerpo del correo
    const sender = "juan.munoz@affi.net";//Correo del remitente
    const urlMailSend = `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`;// URL para enviar el correo

    //Contrucción del contenido HTML del correo
    const htmlContent = emailRemember(
      nameDestinatario,
      numContrato,
      nombreCliente,
      proceso.fecha,
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

    // Enviar correo usando Graph API De Microsoft
    const res = await axios.post(urlMailSend, jsonBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📨 Mensaje enviado correctamente:", res.data);
  } catch (error) {
    console.error("❌ Error al enviar el correo:");

    if (error.response) {
      console.error("Código de estado:", error.response.status);
      console.error("Respuesta del servidor:", error.response.data);
    } else {
      console.error("Mensaje:", error.message);
    }

    throw error;
  }
}

export default rememberMail;
