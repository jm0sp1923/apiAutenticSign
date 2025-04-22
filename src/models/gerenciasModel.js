import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
    cc: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      enum: ["Comercial", "General"],
      required: true
    },
  });
  
export default mongoose.model("Gerencias", processSchema);