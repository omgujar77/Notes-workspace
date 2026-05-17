import express from "express";

import { generateSummary } from "../controllers/aiController.js";

import protect from "../middleware/authMiddleware.js";

import validate from "../utils/validate.js";

import {
  summarizeValidation,
} from "../validators/aiValidator.js";

const router = express.Router();

router.post(
  "/summarize/:id",

  protect,

  summarizeValidation,

  validate,

  generateSummary
);

export default router;