import Gerencias from "../models/gerenciasModel.js";


// Ejemplo con Mongoose
const getFirmantesInternos = async () => {
    const comercial = await Gerencias.findOne({ type: "Comercial" });
    const gerencia = await Gerencias.findOne({ type: "General" });
  
    return {
      comercial,
      gerencia
    };
  };
  
  export default getFirmantesInternos;