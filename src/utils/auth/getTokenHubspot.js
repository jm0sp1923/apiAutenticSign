import "dotenv/config"; // Cargar variables de entorno desde el archivo .env
import axios from "axios"; // Importar axios para realizar solicitudes HTTP

// Cargar los valores necesarios desde las variables de entorno
const refresh_token = process.env.REFRESH_TOKEN_HUBSPOT; // Token de refresco de HubSpot
const CLIENT_ID = process.env.CLIENT_ID_HUBSPOT;         // ID de cliente de HubSpot
const CLIENT_SECRET = process.env.CLIENT_SECRET_HUBSPOT; // Secreto de cliente de HubSpot
const END_POINT = process.env.END_POINT_GET_TOKEN_API_HUBSPOT; // URL del endpoint para obtener el token

// Función para refrescar el token de acceso de HubSpot utilizando el token de refresco
const refreshAccessToken = async () => {
  // Crear un objeto URLSearchParams con los parámetros necesarios para la solicitud
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");        // Tipo de concesión (refresh_token)
  params.append("client_id", CLIENT_ID);               // ID de cliente
  params.append("client_secret", CLIENT_SECRET);       // Secreto de cliente
  params.append("refresh_token", refresh_token);       // Token de refresco

  try {
    // Imprimir mensaje indicando que estamos solicitando un nuevo token
    console.log("🔄 Solicitando nuevo token...");

    // Realizar la solicitud POST a la API de HubSpot para obtener un nuevo token
    const response = await axios.post(END_POINT, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" } // Establecer los encabezados apropiados
    });

    // Si la solicitud es exitosa, mostrar el token recibido
    console.log("✅ Token recibido:", response.data);

    // Retornar el token de acceso y el tiempo de expiración
    return { access_token: response.data.access_token, expiresIn: response.data.expires_in };

  } catch (e) {
    // Si ocurre un error en la solicitud, mostrar el error en la consola
    console.error("❌ Error refreshing access token:", e.message);
    process.exit(1); // Finalizar el proceso con un código de salida 1 (error)
  }
};

// Exportar la función para que se pueda utilizar en otros archivos
export default refreshAccessToken;
