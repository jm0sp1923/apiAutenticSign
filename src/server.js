import app from "./app.js";
import routes from "./routes/index.js";
import connectDB from "./db.js";
import expressListRoutes from "express-list-routes";

const PORT = process.env.PORT || 3000;

connectDB(); // Conectar a la base de datos MongoDB

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log("📌 API Routes:");

  expressListRoutes(app,{ prefix: "" });

  expressListRoutes(routes,{ prefix: "/api" });
});
