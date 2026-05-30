import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "./authService";

import type {
  AuthState,
  LoginPayload,
  RegisterPayload,
} from "./types";

const initialState: AuthState = {
  user: null,

  token:
    localStorage.getItem(
      "accessToken"
    ),

  loading: false,

  error: null,
};

export const register =
  createAsyncThunk(
    "auth/register",

    async (
      payload: RegisterPayload,
      thunkAPI
    ) => {
      try {
        const response =
          await registerUser(
            payload
          );

     

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Registration failed"
        );
      }
    }
  );

export const login =
  createAsyncThunk(
    "auth/login",

    async (
      payload: LoginPayload,
      thunkAPI
    ) => {
      try {
        const response =
          await loginUser(
            payload
          );

        localStorage.setItem(
          "accessToken",
          response.data
            .accessToken
        );

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      }
    }
  );

export const refreshAccessToken =
  createAsyncThunk(
    "auth/refreshToken",

    async (_, thunkAPI) => {
      try {
        const response =
          await refreshToken();

       localStorage.setItem(
  "accessToken",
  response.data.accessToken
);

return response.data.accessToken;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          "Session expired"
        );
      }
    }
  );

export const logout =
  createAsyncThunk(
    "auth/logout",

    async () => {
      await logoutUser();

      localStorage.removeItem(
        "accessToken"
      );
    }
  );

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      register.pending,
      (state) => {
        state.loading = true;

        state.error = null;
      }
    );

    builder.addCase(
      register.fulfilled,
      (state, action) => {
        state.loading = false;

        state.user =
          action.payload.user;

      
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

    builder.addCase(
      login.pending,
      (state) => {
        state.loading = true;

        state.error = null;
      }
    );

    builder.addCase(
      login.fulfilled,
      (state, action) => {
        state.loading = false;

        state.user =
          action.payload.user;

        state.token =
          action.payload
            .accessToken;
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

    builder.addCase(
      refreshAccessToken.fulfilled,
      (state, action) => {
        state.token =
          action.payload;
      }
    );

    builder.addCase(
      logout.fulfilled,
      (state) => {
        state.user = null;

        state.token = null;
      }
    );
  },
});

export default authSlice.reducer;