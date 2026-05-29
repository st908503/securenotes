import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  createNoteApi,
  deleteNoteApi,
  fetchNotesApi,
} from "./notesService";

import type {
  CreateNotePayload,
  NotesState,
} from "./types";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| Fetch Notes
|--------------------------------------------------------------------------
*/

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (
    search: string | undefined,
    thunkAPI
  ) => {
    try {
      const response =
        await fetchNotesApi(search);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch notes"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Create Note
|--------------------------------------------------------------------------
*/

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (
    payload: CreateNotePayload,
    thunkAPI
  ) => {
    try {
      const response =
        await createNoteApi(payload);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create note"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Delete Note
|--------------------------------------------------------------------------
*/

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (
    noteId: string,
    thunkAPI
  ) => {
    try {
      await deleteNoteApi(noteId);

      return noteId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete note"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | Fetch Notes
    |--------------------------------------------------------------------------
    */

    builder.addCase(
      fetchNotes.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addCase(
      fetchNotes.fulfilled,
      (state, action) => {
        state.loading = false;

        state.notes = action.payload;
      }
    );

    builder.addCase(
      fetchNotes.rejected,
      (state, action) => {
        state.loading = false;

        state.error =
          action.payload as string;
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Create Note
    |--------------------------------------------------------------------------
    */

    builder.addCase(
      createNote.fulfilled,
      (state, action) => {
        state.notes.unshift(action.payload);
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Delete Note
    |--------------------------------------------------------------------------
    */

    builder.addCase(
      deleteNote.fulfilled,
      (state, action) => {
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload
        );
      }
    );
  },
});

export default notesSlice.reducer;