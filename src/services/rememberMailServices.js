import "dotenv/config";
import axios from "axios";
import getToken from "../config/tokenTenant.js";
import emailRememberGerencia from "../templates/templateEmailGerentes.js";
import emailRememberDirector from "../templates/templateEmailDirectores.js";
import Procesos from "../models/processModel.js";
import Gerencias from "../models/gerenciasModel.js";
import Directores from "../models/directores_comerciales.js";

async function rememberMail(data, destinatarioTipo) {
  try {

    if (destinatarioTipo === "gerente") {
      await enviarCorreoGerencia(data);
    } else if (destinatarioTipo === "director") {
      await enviarCorreoDirector(data);
    } else {
      throw new Error("Tipo de destinatario no válido");
    }
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

async function enviarCorreoGerencia(data) {
  // Validar que los datos necesarios estén presentes para la creación del correo
  const { numContrato, nombreCliente, processId, tipo_contrato } = data;


  // Buscar el proceso por ID
  const proceso = await Procesos.findOne({ processId });

  if (!proceso) {
    throw new Error("Proceso no encontrado");
  }

  let emailDestino = "";
  let nameDestinatario = "";
  let asunto = "";

  // Determinar destinatario del recordatorio
  if (proceso.firmante === "Lilian Paola Holguín Orrego") {
    const gerencia = await Gerencias.findOne({
      cc: 94492994,
    });
    if (!gerencia || !gerencia.email) {
      throw new Error("No se encontró el email del destinatario (Cesar).");
    }
    emailDestino = gerencia.email;
    nameDestinatario = "Cesar Augusto Tezna Castaño";
  } else {
    const gerencia = await Gerencias.findOne({
      cc: 1112956229,
    });
    if (!gerencia || !gerencia.email) {
      throw new Error("No se encontró el email del destinatario (Lilian).");
    }
    emailDestino = gerencia.email;
    nameDestinatario = "Lilian Paola Holguín Orrego";
  }

  if (tipo_contrato === "Jurídica") {
    asunto = "Contrato de Fianza Jurídica - AutenTIC Sign";
  } else if (tipo_contrato === "Natural") {
    asunto = "Contrato De Fianza Natural - AutenTIC Sign";
  }



  //Contrucción del contenido HTML del correo
  const htmlContent = emailRememberGerencia(
    nameDestinatario,
    numContrato,
    nombreCliente,
    proceso.fecha,
    processId,
    asunto
  );

  // Enviar correo usando Graph API De Microsoft
  const res = await enviarCorreo(emailDestino, htmlContent);

  console.log("📨 Mensaje enviado correctamente:", res.data);
}

async function enviarCorreoDirector(data) {
  
  const { numContrato, nombreCliente, processId, zona } = data;

  // Buscar el proceso por ID
  const proceso = await Procesos.findOne({ processId });

  const gerencia = await Gerencias.findOne({type: "Comercial"});

  if (!proceso) {
    throw new Error("Proceso no encontrado");
  }

  
  if (proceso.firmante !== `${gerencia.name} ${gerencia.last_name}`) {
    throw new Error("Aun no firma Lilian Paola Holguín Orrego.");
  }else{
  
  let emailDestino = "";
  let nameDestinatario = "";


  // Determinar destinatario del recordatorio
  const zonasValidas = ["Antioquia", "Bogotá", "Regiones"];
if (!zonasValidas.includes(zona)) {
  throw new Error("Zona no válida.");
}

const director = await Directores.findOne({ zona });
if (!director || !director.email) {
  throw new Error(`No se encontró el email del destinatario (Zona ${zona}).`);
}
emailDestino = director.email;
nameDestinatario = `${director.name} ${director.last_name}`;

  //Contrucción del contenido HTML del correo
  const htmlContent = emailRememberDirector(
    nameDestinatario,
    numContrato,
    nombreCliente,
    proceso.modificado,
    proceso.firmante
  );

  
  // Enviar correo usando Graph API De Microsoft
  const res = await enviarCorreo(emailDestino, htmlContent);

  console.log("📨 Mensaje enviado correctamente:", res.data);}
} 


async function enviarCorreo(destinatarioEmail, htmlContent) {
  const token = await getToken(); // Obtener el token de autenticación para la API de Microsoft Graph
  const sender = "comercial@affi.net"; //Correo del remitente
  const urlMailSend = `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`;

  const jsonBody = {
    message: {
      subject: "Recordatorio de Firma",
      body: { contentType: "HTML", content: htmlContent },
      toRecipients: [{ emailAddress: { address: destinatarioEmail } }],
    },
    saveToSentItems: false,
  };

  return axios.post(urlMailSend, jsonBody, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}


export default rememberMail;
