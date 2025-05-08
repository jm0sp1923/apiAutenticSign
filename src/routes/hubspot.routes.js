// Importamos las dependencias necesarias para manejar las rutas
import express from "express";

// Importamos los controladores que contienen la lógica para procesar las solicitudes
import { procesarArchivoController } from "../controllers/procesarArchivoController.js";
import { rememberMail } from "../controllers/emailRememberController.js";
import { validarProcessID } from "../middlewares/validarFile.js"; // Middleware para validar el ID de proceso
import obtenerDatosEmail from "../controllers/obtenerDatosEmailController.js";

// Creamos una instancia del router de express para manejar las rutas
const router = express.Router();

// Definimos las rutas y los controladores que manejarán las solicitudes

// Ruta para procesar un archivo: 
// Se utiliza el middleware 'validarProcessID' para verificar el ID de proceso antes de llamar al controlador
router.post("/procesarArchivo", validarProcessID, procesarArchivoController);

// Ruta para enviar un recordatorio por correo electrónico
router.post("/emailReminder", validarProcessID,rememberMail);

// Ruta para obtener datos de un correo electrónico, con un cuerpo de solicitud que permite texto plano
router.post("/obtenerDatosEmail", express.text({ type: '*/*' }), obtenerDatosEmail);

// Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación
export default router;
