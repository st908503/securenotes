import type { Note } from "../../types";

export interface NotesResponse {
  success: boolean;
  message?: string;
  data: Note[];
}

export interface CreateNotePayload {
  title: string;
  content: string;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}
