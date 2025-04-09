import express from "express";
import {procesarArchivoController} from "../controllers/procesarArchivoController.js";
import {rememberMail} from "../controllers/procesarArchivoController.js"
import {validarProcessID} from "../middlewares/validarFile.js";
const router = express.Router();

router.post("/procesarArchivo",validarProcessID, procesarArchivoController);
router.post("/emailRemender", rememberMail)

export default router;
