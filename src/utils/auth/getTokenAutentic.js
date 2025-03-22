import axios from "axios";
import "dotenv/config";

const tokenRequestBody = {audience: process.env.AUDIENCE,grant_type: process.env.GRANT_TYPE,client_id: process.env.CLIENT_ID,client_secret: process.env.CLIENT_SECRET};

const END_POINT_GET_TOKEN_API_AUTNETIC_SIGN = process.env.END_POINT_GET_TOKEN_API_AUTNETIC_SIGN;

const getTokenApi = async () => {
  try {
    const tokenResponse = await axios.post(
      END_POINT_GET_TOKEN_API_AUTNETIC_SIGN,
      tokenRequestBody
    );

    console.log("🔑 Token obtenido correctamente de Autentic", tokenResponse.data);

    const token = {token: tokenResponse.data.access_token, expiresIn: tokenResponse.data.expires_in};

    return token;
  } catch (error) {
    console.error("Error obtaining token:", error);
    return { status: "500", error: "No se pudo obtener el token" };
  }
};

export default getTokenApi;
