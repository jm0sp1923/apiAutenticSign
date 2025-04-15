
async function obtenerDatosEmail(req,res) {
    
    try{
        res.status(200).json({"cuerpo": req.body})
    }catch{

        res.status("400").json({"mesage": "Correo no enviado"})
    }
    

}

export {obtenerDatosEmail}