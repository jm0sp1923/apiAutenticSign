import fs from "fs/promises";
import getTokenApi from "../utils/auth/getTokenAutentic.js";

const tokenFilePath =  "/tmp/tokenAutentic.json";
let tokenCache = null; 

async function getValidAutenticToken() {
  if (tokenCache && tokenCache.expiresAt > Math.floor(Date.now() / 1000)) {
    console.log("🔄 Reutilizando token de Autentic desde caché");
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
      console.log("🔄 Reutilizando token de Autentic desde tokenAutentic.json");
      tokenCache = tokenData;
      return tokenData.token;
    }

    console.log("🔑 Obteniendo un nuevo token de Autentic...");
    const newTokenData = await getTokenApi();

    const newToken = {
      token: newTokenData.token,
      expiresAt: Math.floor((Date.now() + newTokenData.expiresIn) / 1000),  
    };

    await fs.writeFile(tokenFilePath, JSON.stringify(newToken, null, 2), "utf-8");
    console.log("✅ Token guardado correctamente en tokenAutentic.json:", newToken);


    return newToken.token;

  } catch (error) {
    console.error("❌ Error al obtener un token válido de Autentic:", error.message);
    throw error;
  }
}

export default getValidAutenticToken;
