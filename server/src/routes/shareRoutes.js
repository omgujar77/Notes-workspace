import express from "express";

import {
  togglePublicNote,
  getPublicNote,
} from "../controllers/shareController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// PRIVATE ROUTE
router.patch("/toggle/:id", protect, togglePublicNote);


// PUBLIC ROUTE
router.get("/:shareId", getPublicNote);

export default router;