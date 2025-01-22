import express from "express";
import cors from "cors";

import indexRouter from "./routes/index.js";
import consultarEstadoProceso from "./routes/consultarProceso.js";
import asignarRouter from "./routes/asignarProceso.js";

const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());
app.use(cors());
// Rutas
app.use(indexRouter);
app.use(consultarEstadoProceso);
app.use(asignarRouter);
// Manejo de rutas no definidas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
