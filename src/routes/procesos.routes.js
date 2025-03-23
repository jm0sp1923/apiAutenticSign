import express from "express";
import {cargarProcesoController,obtenerEstadoProcesoController} from "../controllers/procesoController.js";
import {validarProceso,} from "../middlewares/validarProceso.js";
import {validarMasiveId} from "../middlewares/validarFile.js";
const router = express.Router();

router.post("/asignarProceso", validarProceso, cargarProcesoController);
router.post("/consultarEstadoProceso",validarMasiveId, obtenerEstadoProcesoController);

export default router;
