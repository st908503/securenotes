import express from "express";
import { body } from "express-validator";

import {
  addNote,
  fetchNotes,
  removeNote,
} from "../controllers/notes.controller";

import { protect } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";

const router = express.Router();

router.get("/", protect, fetchNotes);

router.post(
  "/",
  protect,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("content").notEmpty().withMessage("Content is required"),

    validateRequest,
  ],
  addNote,
);

router.delete("/:id", protect, removeNote);

export default router;
