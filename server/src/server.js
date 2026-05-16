import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import verifyToken from "./middleware/verifyToken.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/shared", shareRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

/*
  GLOBAL ERROR HANDLER
  MUST BE AFTER ROUTES
*/
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});