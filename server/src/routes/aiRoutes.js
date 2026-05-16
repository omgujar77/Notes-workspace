import express from "express";

import { generateSummary } from "../controllers/aiController.js";

import verifyToken from "../middleware/verifyToken.js";

import validate from "../middleware/validate.js";

import {
  summarizeValidation,
} from "../validators/aiValidator.js";

const router = express.Router();

router.post(
  "/summarize/:id",

  verifyToken,

  summarizeValidation,

  validate,

  generateSummary
);

export default router;