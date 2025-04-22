import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
    processId: {
      type: String,
      required: true,
      unique: true
    },
    firmante: {
      type: String,
      trim: true,
      required: true
    },
    fecha: {
      type: String,
      default: Date.now
    }
  });
  
export default mongoose.model("procesos", processSchema);