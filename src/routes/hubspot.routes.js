import express from "express";
import { adjuntarArchivoController,crearArchivoController,crearNotaController } from "../controllers/hubspotController.js";

const router = express.Router();

router.post("/adjuntarArchivo", adjuntarArchivoController);
router.get("/crearArchivo", crearArchivoController);
router.get("/crearNota", crearNotaController);	


export default router;
