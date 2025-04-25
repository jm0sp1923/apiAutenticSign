// Importamos el servicio que maneja el envío de correos electrónicos
import rememberMailService from "../services/rememberMailServices.js";


// Esta función se encarga de recibir la solicitud y llamar al servicio de envío de correo
async function rememberMail(req, res) {
    
    try {
        // Llamamos al servicio 'rememberMailService' pasando el cuerpo de la solicitud (req.body)
        await rememberMailService(req.body);
        
        // Si todo va bien, respondemos con un mensaje de éxito
        res.status(200).json({ message: "Correo enviado" });
    } catch (error) {
        // Si el error es de "Proceso no encontrado", respondemos con un código 404
        if (error.message === "Proceso no encontrado") {
          return res.status(404).json({ message: "Proceso no encontrado" });
        }
    
        // Si ocurre otro error, respondemos con un código 400
        res.status(400).json({ message: "Correo no enviado" });
    }
}

// Exportamos la función 'rememberMail' para usarla en las rutas
export { rememberMail };
