import express from "express";

import {
  togglePublicNote,
  getPublicNote,
} from "../controllers/shareController.js";

import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validate.js";

import {
  toggleShareValidation,
  publicShareValidation,
} from "../validators/shareValidator.js";

const router = express.Router();


// PRIVATE ROUTE
router.patch(
  "/toggle/:id",

  protect,

  toggleShareValidation,

  validate,

  togglePublicNote
);


// PUBLIC ROUTE
router.get(
  "/:shareId",

  publicShareValidation,

  validate,

  getPublicNote
);

export default router;