import { param } from "express-validator";

export const toggleShareValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid note ID"),
];

export const publicShareValidation = [
  param("shareId")
    .notEmpty()
    .withMessage("Share ID is required"),
];