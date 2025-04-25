import mongoose from "mongoose";

// Definimos el esquema de Mongoose para la colección "Gerencias"
const processSchema = new mongoose.Schema({
  // Campo de cédula (cc), debe ser un número único y obligatorio
  cc: {
    type: Number,
    required: true,     // Obligatorio
    unique: true         // No se puede repetir
  },
  // Campo de nombre
  name: {
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
  type: {
    type: String,
    enum: ["Comercial", "General"],  // Solo puede ser uno de estos dos
    required: true                   // Obligatorio
  },
});

// Exportamos el modelo llamado "Gerencias", que usará este esquema
export default mongoose.model("Gerencias", processSchema);
