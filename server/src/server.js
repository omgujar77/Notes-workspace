import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import env from "./config/env.js";

import setupRoutes from "./routes/index.js";

import protect from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// MIDDLEWARES
app.use(cors());

app.use(express.json());

// DATABASE CONNECTION
connectDB();

// ROUTES
setupRoutes(app);

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "API Running",
  });
});

// PROTECTED TEST ROUTE
app.get(
  "/api/protected",

  protect,

  (req, res) => {
    res.json({
      success: true,
      message: "Protected route accessed",
      user: req.user,
    });
  }
);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});