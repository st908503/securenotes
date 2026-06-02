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

// GET ALL NOTES
router.get("/", protect, fetchNotes);

// CREATE NOTE
router.post(
  "/",
  protect,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required"),

    body("content")
      .notEmpty()
      .withMessage("Content is required"),

    validateRequest,
  ],
  addNote
);

// DELETE NOTE
router.delete("/:id", protect, removeNote);

export default router;