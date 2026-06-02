import { Note } from "../models/note.model";
import { ApiError } from "../lib/ApiError";
import { connectDB } from "../config/db";

interface CreateNoteInput {
  userId: string;
  title: string;
  content: string;
}

interface GetNotesInput {
  userId: string;
  search?: string;
}

// CREATE NOTE
export const createNote = async ({
  userId,
  title,
  content,
}: CreateNoteInput) => {
  await connectDB(); // 🔥 REQUIRED FOR VERCEL

  const note = await Note.create({
    user: userId,
    title,
    content,
  });

  return note;
};

// GET NOTES
export const getUserNotes = async ({ userId, search }: GetNotesInput) => {
  await connectDB(); // 🔥 REQUIRED

  const query: any = {
    user: userId,
  };

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  const notes = await Note.find(query).sort({
    createdAt: -1,
  });

  return notes;
};

// DELETE NOTE
export const deleteNote = async (noteId: string, userId: string) => {
  await connectDB(); // 🔥 REQUIRED

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