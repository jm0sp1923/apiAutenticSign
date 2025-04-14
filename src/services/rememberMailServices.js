import "dotenv/config";
import axios from "axios";

const { CLIENT_ID_AD, CLIENT_SECRET_AD, TENANT_ID_AD } = process.env;

async function getToken() {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID_AD}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", CLIENT_ID_AD);
  params.append("client_secret", CLIENT_SECRET_AD);
  params.append("scope", "https://graph.microsoft.com/.default");

  const response = await axios.post(tokenUrl, params);
  return response.data.access_token;
}

const html = (nombre_destinatario,num_contrato, nombre_cliente, fecha_envio_correo, process_id) => `
  <body>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7; padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.1); border:1px solid #e0e0e0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#333;">
            <tr>
              <td>
                <h2 style="color:#1a202c; margin-bottom:20px;">¡Hola <strong>${nombre_destinatario}</strong>!</h2>
                <p style="font-size:16px; line-height:1.6;">
                  Este es un recordatorio de que aún está pendiente la firma del contrato: 
                </p>

                <div style="background-color:#f9fafb; border-left:4px solid #2b2d77; padding:15px 20px; margin-top:20px; border-radius:6px; font-size:15px;">
                  <p><strong>📄 Número de contrato:</strong> ${num_contrato}</p>
                  <p><strong>🏣 Nombre cliente:</strong> ${nombre_cliente}</p>
                  <p><strong>📅 Fecha de envío:</strong> ${fecha_envio_correo}</p>
                  <p><strong>🔁 Process ID:</strong> ${process_id}</p>
                </div>

                <p style="font-size:16px; line-height:1.6; margin-top:20px;">
                Por favor revisa tu bandeja de entrada en la fecha de envío para ver el correo con el enlace para firmar.
                </p>
                <pstyle="font-size:12px; line-height:1.6; margin-top:20px;">
                  <strong>Nota</strong>: Puedes buscar el correo con el enlace de firma que contiene el ID de proceso <strong>${process_id}</strong>. Si ya completaste la firma, puedes ignorar este mensaje.
                </p>

                <p style="margin-top:30px; font-size:13px; color:#888; text-align:center;">
                  Gracias por tu atención.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px;">
                <hr style="border:none; border-top:1px solid #e0e0e0;" />
                <p style="font-size:13px; color:#999; text-align:center; margin-top:20px;">
                  Siempre Moviéndonos Hacia Adelante
                </p>
                <p style="font-size:12px; text-align:center;">
                  <a href="#" style="margin: 0 10px; text-decoration:none; color:#4a90e2;">Facebook</a> |
                  <a href="#" style="margin: 0 10px; text-decoration:none; color:#4a90e2;">LinkedIn</a> |
                  <a href="#" style="margin: 0 10px; text-decoration:none; color:#4a90e2;">X</a> |
                  <a href="#" style="margin: 0 10px; text-decoration:none; color:#4a90e2;">Instagram</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`;

async function rememberMail(data) {
  try {
    const {numContrato,nombreCliente,fechaEnvio,processId}  = data
    const token = await getToken();

    const sender = "juan.munoz@affi.net";
    const urlMailSend = `https://graph.microsoft.com/v1.0/users/${sender}/sendMail`;

    const htmlContent = html("  ",numContrato, nombreCliente, fechaEnvio, processId);

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
