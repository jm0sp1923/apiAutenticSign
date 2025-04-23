import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado a la base de datos MongoDB")
    } catch (error) {
        console.log("Error al conectar a la base de datos:", error.message);     
    }
}

export default connectDB;