import mongoose from "mongoose";

// Definimos el esquema de Mongoose para la colección "Gerencias"
const processSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,          // Elimina espacios al inicio y al final
    required: true       // Obligatorio
  },
  last_name:{
    type: String,
    trim: true,          // Elimina espacios al inicio y al final
    required: true       // Obligatorio
  },
  // Campo de correo electrónico, debe ser único
  email: {
    type: String,
    unique: true         // No se puede repetir
  },
  // Tipo de gerencia, debe ser uno de los valores definidos
  zona: {
    type: String,
    enum: ["Antioquia", "Bogotá","Regiones"],  // Solo puede ser uno de estos dos
    required: true                   // Obligatorio
  },
});

// Exportamos el modelo llamado "Gerencias", que usará este esquema
export default mongoose.model("directores_comerciales", processSchema);
