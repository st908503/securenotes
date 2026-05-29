import { api } from "../../utils/api";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "./types";

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return response.data;
};