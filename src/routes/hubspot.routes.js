import express from "express";
import {procesarArchivoController} from "../controllers/procesarArchivoController.js";
const router = express.Router();

router.post("/procesarArchivo", procesarArchivoController);

export default router;
