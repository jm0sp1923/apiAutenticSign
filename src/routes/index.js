// Importamos la dependencia 'express' para trabajar con rutas
import express from "express";

// Importamos las rutas específicas de los distintos recursos que se manejan en la aplicación
import procesoRoutes from "./procesos.routes.js";
import fileRoutes from "./file.routes.js"; 
import hubspotRoutes from "./hubspot.routes.js";

// Creamos una instancia de Router de express para manejar rutas
const router = express.Router();

// Definimos las rutas para los diferentes recursos con sus respectivos prefijos

// Ruta para el recurso "procesos", se usará 'procesosRoutes' para manejar las solicitudes
router.use("/procesos", procesoRoutes);

// Ruta para el recurso "archivos", se usará 'fileRoutes' para manejar las solicitudes
router.use("/archivos", fileRoutes);

// Ruta para el recurso "hubspot", se usará 'hubspotRoutes' para manejar las solicitudes
router.use("/hubspot", hubspotRoutes);

// Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación (app.js)
export default router;
