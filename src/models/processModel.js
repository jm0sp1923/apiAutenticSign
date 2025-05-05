import mongoose from "mongoose";

// Definimos el esquema de Mongoose para la colección "procesos"
const processSchema = new mongoose.Schema({
  // Identificador único del proceso (processId), debe ser un String, obligatorio y único
  processId: {
    type: String,
    required: true,     // Obligatorio
    unique: true         // No se puede repetir
  },
  // Campo para el nombre del firmante, debe ser un String, recorta los espacios y es obligatorio
  firmante: {
    type: String,
    trim: true,          // Elimina espacios al inicio y al final
    required: true       // Obligatorio
  },
  // Fecha del proceso, se define como un String con un valor por defecto de la fecha actual
  fecha: {
    type: String,
    default: Date.now   // Por defecto se establece la fecha y hora actual
  },
  // Campo para el asunto del correo, debe ser un String, recorta los espacios y es obligatorio
  asunto:{
    type: String,
    trim: true,          // Elimina espacios al inicio y al final
  },
  modificado:{
    type: String,
    default: new Date().toLocaleDateString('es-CO').toString()   // Por defecto se establece la fecha y hora actual
  },

});

// Exportamos el modelo llamado "procesos", que usará este esquema
export default mongoose.model("procesos", processSchema);
