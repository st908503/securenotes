import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
} from "./authService";

import type {
  AuthState,
  LoginPayload,
  RegisterPayload,
} from "./types";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| Register Thunk
|--------------------------------------------------------------------------
*/

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: RegisterPayload,
    thunkAPI
  ) => {
    try {
      const response =
        await registerUser(payload);

      localStorage.setItem(
        "token",
        response.data.token
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Login Thunk
|--------------------------------------------------------------------------
*/

export const login = createAsyncThunk(
  "auth/login",
  async (
    payload: LoginPayload,
    thunkAPI
  ) => {
    try {
      const response =
        await loginUser(payload);

      localStorage.setItem(
        "token",
        response.data.token
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | Register
    |--------------------------------------------------------------------------
    */

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      register.fulfilled,
      (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;
      }
    );

    builder.addCase(
      register.rejected,
      (state, action) => {
        state.loading = false;

        state.error =
          action.payload as string;
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      login.fulfilled,
      (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;
      }
    );

    builder.addCase(
      login.rejected,
      (state, action) => {
        state.loading = false;

        state.error =
          action.payload as string;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;