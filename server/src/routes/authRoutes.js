import express from "express";

import {
  signup,
  login,
} from "../controllers/authController.js";

import {
  signupValidation,
  loginValidation,
} from "../validators/authValidator.js";

import validate from "../utils/validate.js";

const router = express.Router();

router.post(
  "/signup",
  signupValidation,
  validate,
  signup
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

export default router;