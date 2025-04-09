import rememberMailService from "../services/rememberMailServices.js"

async function rememberMail(req,res) {
    
    try{
        const response = rememberMailService(req.data)
        res.status(200).json({"mesage": "Correo enviado"})
    }catch{

        res.status("400").json({"mesage": "Correo no enviado"})
    }
    

}

export {rememberMail}