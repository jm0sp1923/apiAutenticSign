// Importamos el archivo de configuración principal de la aplicación
import app from "./app.js";

// Importamos las rutas que se definirán en la API
import routes from "./routes/index.js";

// Importamos la función que conecta a la base de datos MongoDB
import connectDB from "./db.js";

// Importamos la librería que nos permite listar las rutas de la API
import expressListRoutes from "express-list-routes";

// Establecemos el puerto en el que el servidor escuchará, si no está definido en el entorno, usará el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Conectamos a la base de datos MongoDB utilizando la función importada
connectDB(); // Conectar a la base de datos MongoDB

// Iniciamos el servidor en el puerto definido, y cuando esté listo, mostramos el mensaje de confirmación
app.listen(PORT, () => {
  // Mensaje que indica que el servidor está en ejecución
  console.log(`🚀 Server is running on port ${PORT}`);

  // Mostramos las rutas de la API para verificar que estén correctamente registradas
  console.log("📌 API Routes:");

  // Listamos las rutas de la aplicación principal (sin prefijo)
  expressListRoutes(app, { prefix: "" });

  // Listamos las rutas de la API, con el prefijo "/api"
  expressListRoutes(routes, { prefix: "/api" });
});
