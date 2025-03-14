import express from "express";
import procesoRoutes from "./procesos.routes.js";
import fileRoutes from "./file.routes.js"; 
import hubspotRoutes from "./hubspot.routes.js";
const router = express.Router();

router.use("/procesos", procesoRoutes);
router.use("/archivos", fileRoutes);
router.use("/hubspot", hubspotRoutes);

export default router;
