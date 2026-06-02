import express from "express";
import { body } from "express-validator";

import {
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller";

import { validateRequest } from "../middlewares/validate.middleware";

const router = express.Router();

// REGISTER
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    validateRequest,
  ],
  register
);

// LOGIN
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),

    validateRequest,
  ],
  login
);

// REFRESH TOKEN
router.post("/refresh-token", refreshAccessToken);

// LOGOUT
router.post("/logout", logout);

export default router;