import type { User } from "../../types";

export interface AuthResponse {
  success: boolean;

  message: string;

  data: {
    user: User;

    accessToken: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;

  data: {
    accessToken: string;
  };
}

export interface LoginPayload {
  email: string;

  password: string;
}

export interface RegisterPayload {
  name: string;

  email: string;

  password: string;
}

export interface AuthState {
  user: User | null;

  token: string | null;

  loading: boolean;

  error: string | null;
}