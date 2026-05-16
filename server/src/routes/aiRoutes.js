import express from "express";

import { generateSummary } from "../controllers/aiController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post(
  "/summarize/:id",
  verifyToken,
  generateSummary
);

export default router;