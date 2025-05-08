// Importamos el servicio que maneja el envío de correos electrónicos
import rememberMailService from "../services/rememberMailServices.js";


// Esta función se encarga de recibir la solicitud y llamar al servicio de envío de correo
async function rememberMail(req, res) {
    try {
      const tipoDestinatario = req.query.tipoDestinatario; // "gerente" o "director"
      
      // Pasa el tipo al servicio como parte de los datos
      await rememberMailService({ ...req.body },tipoDestinatario);
  
      res.status(200).json({ message: "Correo enviado" });
    } catch (error) {
      if (error.message === "Proceso no encontrado") {
        return res.status(404).json({ message: "Proceso no encontrado" });
      }
      if(error.message === "Tipo de destinatario no válido") {
        return res.status(400).json({ message: "Tipo de destinatario no válido" });
      }if (error.message === "Aun no firma Lilian Paola Holguín Orrego.") {
        return res.status(200).json({ message: "Aun no firma gerencia comercial" });
      }
  
      res.status(400).json({ message: "Correo no enviado" });
    }
  }
  

// Exportamos la función 'rememberMail' para usarla en las rutas
export { rememberMail };
