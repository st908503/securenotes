import { api } from "../../utils/api";

import type {
  CreateNotePayload,
  NotesResponse,
} from "./types";

/*
|--------------------------------------------------------------------------
| Fetch Notes
|--------------------------------------------------------------------------
*/

export const fetchNotesApi = async (
  search?: string
): Promise<NotesResponse> => {
  const response = await api.get<NotesResponse>(
    "/notes",
    {
      params: {
        search,
      },
    }
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Note
|--------------------------------------------------------------------------
*/

export const createNoteApi = async (
  payload: CreateNotePayload
) => {
  const response = await api.post(
    "/notes",
    payload
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Note
|--------------------------------------------------------------------------
*/

export const deleteNoteApi = async (
  noteId: string
) => {
  const response = await api.delete(
    `/notes/${noteId}`
  );

  return response.data;
};