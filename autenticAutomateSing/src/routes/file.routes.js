import express from "express";
import { consultarArchivoController } from "../controllers/fileController.js";
import  {validarFile}  from "../middlewares/validarFile.js";

const router = express.Router();

router.post("/consultarArchivo",validarFile, consultarArchivoController);

export default router;
