import express from "express";

import {
  togglePublicNote,
  getPublicNote,
} from "../controllers/shareController.js";

import protect from "../middleware/authMiddleware.js";

import validate from "../utils/validate.js";

import {
  toggleShareValidation,
  publicShareValidation,
} from "../validators/shareValidator.js";

const router = express.Router();

router.patch(
  "/toggle/:id",

  protect,

  toggleShareValidation,

  validate,

  togglePublicNote
);

router.get(
  "/:shareId",

  publicShareValidation,

  validate,

  getPublicNote
);

export default router;