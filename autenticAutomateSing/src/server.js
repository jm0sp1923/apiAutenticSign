import app from "./app.js";
import routes from "./routes/index.js";
import expressListRoutes from "express-list-routes";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log("📌 API Routes:");

  // Listar rutas de 'app'
  expressListRoutes(app,{ prefix: "" });

  // Listar rutas de 'routes' con prefijo "/api"
  expressListRoutes(routes,{ prefix: "/api" });
});
