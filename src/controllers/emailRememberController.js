import rememberMailService from "../services/rememberMailServices.js"

async function rememberMail(req,res) {
    
    try{
        
        const response = await rememberMailService(req.body);
        res.status(200).json({"mesage": "Correo enviado"})
    }catch{

        res.status("400").json({"mesage": "Correo no enviado"})
    }

}

export {rememberMail}