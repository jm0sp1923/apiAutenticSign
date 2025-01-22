import axios from "axios";
import "dotenv/config";

const tokenRequestBody = {
  audience: process.env.AUDIENCE,
  grant_type: process.env.GRANT_TYPE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};



const getTokenApi = async () => {
  try {
    const tokenResponse = await axios.post(
      "https://authorizer.autenticsign.com/v2/authorizer/getToken",
      tokenRequestBody
    );

    const token = tokenResponse.data.access_token;

    return token;
  } catch (error) {
    // Log the error for debugging purposes if needed
    console.error("Error obtaining token:", error);
    return { status: "500", error: "No se pudo obtener el token" };
  }
};

export default getTokenApi;
