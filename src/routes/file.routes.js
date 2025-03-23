import express from "express";
import { consultarArchivoController } from "../controllers/fileController.js";
import  {validarProcessID}  from "../middlewares/validarFile.js";

const router = express.Router();

router.post("/consultarArchivo",validarProcessID, consultarArchivoController);

export default router;
