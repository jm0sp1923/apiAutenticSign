import fs from "fs/promises";
import path from "path";
import refreshAccessToken from "../utils/auth/getTokenHubspot.js";


// Ruta del archivo para guardar el token En desarrollo puedes usar una ruta fija en tu proyecto para pruebas 

//const tokenFilePath = path.resolve("src/constants/tokenHubspot.json");

// En producción, Azure no permite modificar archivos en el sistema de archivos local por lo que se utiliza la ruta temporal
const tokenFilePath = "/tmp/tokenHubspot.json";
let tokenCache = null; 

async function getValidHubspotToken() {

  // 1 verifica si el token está en caché y no ha expirado
  if (tokenCache && tokenCache.expiresAt > Math.floor(Date.now() / 1000)) {
    console.log("🔄 Reutilizando token de HubSpot desde caché");
    return tokenCache.token;
  }

  try {
    let tokenData;
    // 2. Verifica si hay token en archivo
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
    
  // 3. Si no hay token válido, en cache o archivo, obten uno nuevo
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