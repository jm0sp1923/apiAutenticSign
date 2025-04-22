import express from "express";
import {procesarArchivoController} from "../controllers/procesarArchivoController.js";
import {rememberMail} from "../controllers/emailRememberController.js"
import {validarProcessID} from "../middlewares/validarFile.js";
import  obtenerDatosEmail  from "../controllers/obtenerDatosEmailController.js";
const router = express.Router();

router.post("/procesarArchivo",validarProcessID, procesarArchivoController);
router.post("/emailRemender", rememberMail)
router.post("/obtenerDatosEmail",obtenerDatosEmail)

export default router;
