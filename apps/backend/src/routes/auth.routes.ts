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

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email").isEmail().withMessage("Valid email is required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    validateRequest,
  ],

  register,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),

    body("password").notEmpty().withMessage("Password is required"),

    validateRequest,
  ],

  login,
);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", logout);

export default router;
