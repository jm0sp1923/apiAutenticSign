import "dotenv/config";
import axios from "axios";


const refresh_token = process.env.REFRESH_TOKEN_HUBSPOT;
const CLIENT_ID = process.env.CLIENT_ID_HUBSPOT;
const CLIENT_SECRET = process.env.CLIENT_SECRET_HUBSPOT;
const END_POINT = process.env.END_POINT_GET_TOKEN_API_HUBSPOT;

// console.log("🔑 CLIENT_ID:", CLIENT_ID);
// console.log("🔑 CLIENT_SECRET:", CLIENT_SECRET);


const refreshAccessToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("refresh_token", refresh_token);

  try {
    console.log("🔄 Solicitando nuevo token...");

    const response = await axios.post(END_POINT, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    console.log("✅ Token recibido:", response.data);
    return { access_token: response.data.access_token, expiresIn: response.data.expires_in };


  } catch (e) {
    console.error("❌ Error refreshing access token:", e.message);
    process.exit(1);
  }
};

export default refreshAccessToken;
