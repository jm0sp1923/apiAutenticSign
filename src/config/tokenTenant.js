import "dotenv/config"; // Carga variables de entorno desde un archivo .env
import axios from "axios"; // Cliente HTTP para hacer solicitudes

// Extraemos las variables necesarias desde el archivo .env
const { CLIENT_ID_AD, CLIENT_SECRET_AD, TENANT_ID_AD } = process.env;

// Función para obtener un token de acceso desde Microsoft (Azure AD)
async function getToken() {
  // URL para obtener el token, usando el Tenant ID configurado
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID_AD}/oauth2/v2.0/token`;

  // Creamos los parámetros necesarios para la solicitud
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials"); // Tipo de flujo OAuth
  params.append("client_id", CLIENT_ID_AD); // ID del cliente registrado en Azure
  params.append("client_secret", CLIENT_SECRET_AD); // Secreto del cliente
  params.append("scope", "https://graph.microsoft.com/.default"); // Alcance solicitado (permite acceso a Microsoft Graph)

  // Realizamos la solicitud POST para obtener el token
  const response = await axios.post(tokenUrl, params);

  // Retornamos solo el token de acceso recibido
  return response.data.access_token;
}

export default getToken; // Exportamos la función para usarla en otros archivos
