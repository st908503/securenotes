import { Request, Response } from "express";

import {
  createNote,
  deleteNote,
  getUserNotes,
} from "../services/notes.service";

import { asyncHandler } from "../utils/asyncHandler";

export const addNote = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;

  const { title, content } = req.body;

  const note = await createNote({
    userId,
    title,
    content,
  });

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

export const fetchNotes = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;

  const notes = await getUserNotes({
    userId,
  });

  res.status(200).json({
    success: true,
    data: notes,
  });
});

export const removeNote = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;

  const noteId = req.params.id as string;

  await deleteNote(noteId, userId);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
