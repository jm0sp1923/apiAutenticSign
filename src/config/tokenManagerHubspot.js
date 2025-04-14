import fs from "fs/promises";
import path from "path";
import refreshAccessToken from "../utils/auth/getTokenHubspot.js";


const tokenFilePath = path.resolve("src/constants/tokenHubspot.json");
//const tokenFilePath =  "/tmp/tokenHubspot.json";
let tokenCache = null; 

async function getValidHubspotToken() {
  if (tokenCache && tokenCache.expiresAt > Math.floor(Date.now() / 1000)) {
    console.log("🔄 Reutilizando token de HubSpot desde caché");
    return tokenCache.token;
  }

  try {
    let tokenData;
    try {
      const fileContent = await fs.readFile(tokenFilePath, "utf-8");
      tokenData = fileContent.trim() ? JSON.parse(fileContent) : { token: null, expiresAt: 0 }; 
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      tokenData = { token: null, expiresAt: 0 };
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenData.token && tokenData.expiresAt > currentTime) {
      console.log("🔄 Reutilizando token de HubSpot desde tokenHubspot.json");
      tokenCache = tokenData;
      return tokenData.token;
    }

    console.log("🔑 Obteniendo un nuevo token de HubSpot...");
    const newTokenData = await refreshAccessToken();

    const newToken = {
      token: newTokenData.access_token,
      expiresAt: currentTime + newTokenData.expiresIn, 
    };

    await fs.writeFile(tokenFilePath, JSON.stringify(newToken, null, 2), "utf-8");
    console.log("✅ Token guardado correctamente en tokenHubspot.json:", newToken);


    return newToken.token;

  } catch (error) {
    console.error("❌ Error al obtener un token válido de HubSpot:", error.message);
    throw error;
  }
}

export default getValidHubspotToken;