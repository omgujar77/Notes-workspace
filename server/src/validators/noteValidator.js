import { body, param } from "express-validator";

export const noteValidation = [

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be text"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be text"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
];

export const noteIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid note ID"),
];