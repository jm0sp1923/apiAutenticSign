import { adjuntarArchivoService,crearArchivoService, crearNotaService } from "../services/hubspotService.js";

async function adjuntarArchivoController(req, res) {
    const { id_vinculacion } = req.body;

    if (!id_vinculacion) {
        return res.status(400).json({ error: "El campo 'id_vinculacion' es obligatorio." });
    }

    try {
        const response = await adjuntarArchivoService(id_vinculacion);
        res.status(200).json({ success: true, data: response, message: "Archivo adjuntado correctamente." });
    } catch (error) {
        console.error("❌ Error al adjuntar archivo:", error.message);
        res.status(404).json({ error: error.message });
    }
}

async function crearNotaController(req,res) {
    try {
        const response = await crearNotaService();
        res.status(200).json({ success: true, data: response, message: "Nota creada correctamente." });
    } catch (error) {
        console.error("❌ Error al crear archivo:", error.message);
        res.status(404).json({ error: error.message });
    }
}

async function crearArchivoController(req,res) {
    const filePath = "./src/downloads/MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf";  
    try {
        const response = await crearArchivoService(filePath);
        res.status(200).json({ success: true, data: response, message: "Archivo creado correctamente." });
    } catch (error) {
        console.error("❌ Error al crear archivo:", error.message);
        res.status(404).json({ error: error.message });
    }
}
export { adjuntarArchivoController,crearArchivoController,crearNotaController };
