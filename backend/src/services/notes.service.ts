import { Note } from "../models/note.model";
import { ApiError } from "../lib/ApiError";

interface CreateNoteInput {
  userId: string;
  title: string;
  content: string;
}

interface GetNotesInput {
  userId: string;
}

export const createNote = async ({
  userId,
  title,
  content,
}: CreateNoteInput) => {
  const note = await Note.create({
    user: userId,
    title,
    content,
  });

  return note;
};

export const getUserNotes = async ({
  userId,
}: GetNotesInput) => {
  const notes = await Note.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return notes;
};

export const deleteNote = async (
  noteId: string,
  userId: string
) => {
  const note = await Note.findOne({
    _id: noteId,
    user: userId,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  await note.deleteOne();

  return note;
};