import express from "express";
import cors from "cors";

import indexRouter from "./routes/index.js";
import consultarEstadoProceso from "./routes/consultarProceso.js";
import asignarProcesoJuridico from "./routes/asignarProcesoJuridico.js";
import asignarProcesoPlantilla from "./routes/asignarProcesoPlantillaNatural.js";

const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());
app.use(cors());


// Ruta de health
app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});


// Ruta de health
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Rutas
app.use(indexRouter);
app.use(consultarEstadoProceso);
app.use(asignarProcesoJuridico);
app.use(asignarProcesoPlantilla);
// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
