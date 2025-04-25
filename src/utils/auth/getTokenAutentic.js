import axios from "axios";
import "dotenv/config";

// Cuerpo de la solicitud para obtener el token de autenticación (con datos de variables de entorno)
const tokenRequestBody = {
  audience: process.env.AUDIENCE,        // Audiencia definida en el archivo .env
  grant_type: process.env.GRANT_TYPE,    // Tipo de concesión de token (también desde .env)
  client_id: process.env.CLIENT_ID,      // ID de cliente desde las variables de entorno
  client_secret: process.env.CLIENT_SECRET // Secreto de cliente desde las variables de entorno
};

// Endpoint de la API donde se obtiene el token de Autentic, tomado de las variables de entorno
const END_POINT_GET_TOKEN_API_AUTNETIC_SIGN = process.env.END_POINT_GET_TOKEN_API_AUTNETIC_SIGN;

// Función para obtener el token de la API de Autentic
const getTokenApi = async () => {
  try {
    // Realizamos la solicitud POST a la API para obtener el token
    const tokenResponse = await axios.post(
      END_POINT_GET_TOKEN_API_AUTNETIC_SIGN, // URL para obtener el token
      tokenRequestBody                        // Cuerpo de la solicitud con los parámetros necesarios
    );

    // Si la solicitud es exitosa, mostramos el token en la consola
    console.log("🔑 Token obtenido correctamente de Autentic", tokenResponse.data);

    // Retornamos el token y el tiempo de expiración
    const token = {
      token: tokenResponse.data.access_token, // Token de acceso recibido
      expiresIn: tokenResponse.data.expires_in // Tiempo de expiración del token
    };

    return token; // Retornamos el token
  } catch (error) {
    // Si ocurre un error en la solicitud, lo capturamos y mostramos el error en la consola
    console.error("Error obtaining token:", error);
    return { status: "500", error: "No se pudo obtener el token" }; // Retornamos un objeto con el estado del error
  }
};

// Exportamos la función para obtener el token
export default getTokenApi;
