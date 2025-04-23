import rememberMailService from "../services/rememberMailServices.js"

async function rememberMail(req,res) {
    
    try {
        await rememberMailService(req.body);
        res.status(200).json({ message: "Correo enviado" });
      } catch (error) {
        if (error.message === "Proceso no encontrado") {
          return res.status(404).json({ message: "Proceso no encontrado" });
        }
    
        res.status(400).json({ message: "Correo no enviado" });
      }

}

export {rememberMail}