import authRoutes from "./authRoutes.js";
import noteRoutes from "./noteRoutes.js";
import aiRoutes from "./aiRoutes.js";
import shareRoutes from "./shareRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";

const setupRoutes = (app) => {
  app.use("/api/auth", authRoutes);

  app.use("/api/notes", noteRoutes);

  app.use("/api/ai", aiRoutes);

  app.use("/api/shared", shareRoutes);

  app.use("/api/dashboard", dashboardRoutes);
};

export default setupRoutes;