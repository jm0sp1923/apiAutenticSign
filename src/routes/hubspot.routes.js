import express from "express";
import {procesarArchivoController} from "../controllers/procesarArchivoController.js";
import {rememberMail} from "../controllers/emailRememberController.js"
import {validarProcessID} from "../middlewares/validarFile.js";
const router = express.Router();

router.post("/procesarArchivo",validarProcessID, procesarArchivoController);
router.post("/emailRemender", rememberMail)
router.post("/obtenerDatosEmail",(req,res) =>{
    console.log(console.log(req.body))
    res.status(200).send("ok")
})

export default router;
