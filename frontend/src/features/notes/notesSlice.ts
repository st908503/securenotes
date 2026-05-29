import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createNoteApi, deleteNoteApi, fetchNotesApi } from "./notesService";

import type { CreateNotePayload, NotesState } from "./types";

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (search: string | undefined, thunkAPI) => {
    try {
      const response = await fetchNotesApi(search);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes",
      );
    }
  },
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (payload: CreateNotePayload, thunkAPI) => {
    try {
      const response = await createNoteApi(payload);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create note",
      );
    }
  },
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId: string, thunkAPI) => {
    try {
      await deleteNoteApi(noteId);

      return noteId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete note",
      );
    }
  },
);

const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;

      state.notes = action.payload;
    });

    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload as string;
    });

    builder.addCase(createNote.fulfilled, (state, action) => {
      state.notes.unshift(action.payload);
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    });
  },
});

export default notesSlice.reducer;
