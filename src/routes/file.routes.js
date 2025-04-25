// Importamos las dependencias necesarias
import express from "express";
import { consultarArchivoController } from "../controllers/fileController.js"; // Controlador para consultar archivos
import { validarProcessID } from "../middlewares/validarFile.js"; // Middleware para validar el ID del proceso

// Creamos una instancia del router de express para manejar las rutas
const router = express.Router();

// Definimos la ruta para consultar un archivo
// Se utiliza el middleware 'validarProcessID' para validar el ID del proceso antes de ejecutar el controlador
router.post("/consultarArchivo", validarProcessID, consultarArchivoController);

// Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación
export default router;
