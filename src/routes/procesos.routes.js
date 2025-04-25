// Importamos las dependencias necesarias
import express from "express";
import { cargarProcesoController, obtenerEstadoProcesoController } from "../controllers/procesoController.js"; // Controladores para asignar y consultar estado de procesos
import { validarProceso } from "../middlewares/validarProceso.js"; // Middleware para validar el proceso
import { validarMasiveId } from "../middlewares/validarFile.js"; // Middleware para validar el ID masivo

// Creamos una instancia del router de express para manejar las rutas
const router = express.Router();

// Definimos la ruta para asignar un proceso
// Se utiliza el middleware 'validarProceso' para validar el proceso antes de ejecutar el controlador
router.post("/asignarProceso", validarProceso, cargarProcesoController);

// Definimos la ruta para consultar el estado de un proceso
// Se utiliza el middleware 'validarMasiveId' para validar el ID masivo antes de ejecutar el controlador
router.post("/consultarEstadoProceso", validarMasiveId, obtenerEstadoProcesoController);

// Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación
export default router;
