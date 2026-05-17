import express from "express";

import protect from "../middleware/authMiddleware.js";

import validate from "../utils/validate.js";

import {
  noteValidation,
  noteIdValidation,
} from "../validators/noteValidator.js";

import {
  getNotes,
  createNote,
  updateNote,
  archiveNote,
  restoreNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// GET ALL NOTES
router.get("/", protect, getNotes);

// CREATE NOTE
router.post(
  "/",
  protect,
  noteValidation,
  validate,
  createNote
);

// UPDATE NOTE
router.put(
  "/:id",
  protect,
  noteIdValidation,
  noteValidation,
  validate,
  updateNote
);

// ARCHIVE NOTE
router.patch(
  "/archive/:id",
  protect,
  archiveNote
);

// RESTORE NOTE
router.patch(
  "/restore/:id",
  protect,
  restoreNote
);

// DELETE NOTE
router.delete(
  "/:id",
  protect,
  noteIdValidation,
  validate,
  deleteNote
);

export default router;