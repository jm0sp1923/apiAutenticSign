import express from "express";
import {procesarArchivoController} from "../controllers/procesarArchivoController.js";
import {validarProcessID} from "../middlewares/validarFile.js";
const router = express.Router();

router.post("/procesarArchivo",validarProcessID, procesarArchivoController);

export default router;
