import { param } from "express-validator";

export const summarizeValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid note ID"),
];