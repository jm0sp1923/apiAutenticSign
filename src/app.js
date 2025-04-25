// Importamos las dependencias necesarias: express, cors y las rutas definidas
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

// Creamos una instancia de la aplicación express
const app = express();

// Middlewares

// Middleware que permite a la aplicación interpretar los cuerpos de las solicitudes en formato JSON
app.use(express.json());

// Middleware de CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde diferentes orígenes
app.use(cors());

// Rutas

// Definimos la ruta base ("/") que devuelve un mensaje de "Hello world"
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// Ruta de health check para verificar si el servidor está funcionando correctamente
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Usamos las rutas definidas en el archivo `routes/index.js` para todas las rutas que comienzan con "/api"
app.use("/api", routes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Exportamos la aplicación `app` sin iniciar el servidor, para que se pueda iniciar en otro archivo (como `server.js`)
export default app;
