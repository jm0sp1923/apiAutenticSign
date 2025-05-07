import fs from "fs/promises";
import path from "path";
import getTokenApi from "../utils/auth/getTokenAutentic.js";

// Ruta del archivo para guardar el token
// En desarrollo puedes usar una ruta fija en tu proyecto para pruebas 
//const tokenFilePath = path.resolve("src/constants/tokenAutentic.json");
// En producción, Azure no permite modificar archivos en el sistema de archivos local por lo que se utiliza la ruta temporal
const tokenFilePath = "/tmp/tokenAutentic.json";

let tokenCache = null;

async function getValidAutenticToken() {
  
  const currentTime = Math.floor(Date.now() / 1000);

  // 1 verifica si el token está en caché y no ha expirado
  if (tokenCache && tokenCache.expiresAt > currentTime) {
    console.log("🔄 Reutilizando token de Autentic desde caché");
    return tokenCache.token;
  }

  try {
    let tokenData;

    // 2. Verifica token en archivo
    try {
      const fileContent = await fs.readFile(tokenFilePath, "utf-8");
      tokenData = fileContent.trim()
        ? JSON.parse(fileContent)
        : { token: null, expiresAt: 0 };
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      tokenData = { token: null, expiresAt: 0 };
    }

    if (tokenData.token && tokenData.expiresAt > currentTime) {
      console.log("📁 Reutilizando token de Autentic desde tokenAutentic.json");
      tokenCache = tokenData;
      return tokenData.token;
    }

    // 3. Si no hay token válido, en cache o archivo, obten uno nuevo
    console.log("🔑 Obteniendo un nuevo token de Autentic...");
    const newTokenData = await getTokenApi();

    if (!newTokenData?.token || !newTokenData?.expiresIn) {
      throw new Error("Token o tiempo de expiración no válidos al obtener nuevo token.");
    }

    const newToken = {
      token: newTokenData.token,
      expiresAt: Math.floor((Date.now() + newTokenData.expiresIn) / 1000),
    };

    await fs.writeFile(tokenFilePath, JSON.stringify(newToken, null, 2), "utf-8");
    console.log("✅ Token guardado correctamente en tokenAutentic.json");

    tokenCache = newToken;
    return newToken.token;
  } catch (error) {
    console.error("❌ Error al obtener un token válido de Autentic:", error.message);
    throw error;
  }
}

export default getValidAutenticToken;
