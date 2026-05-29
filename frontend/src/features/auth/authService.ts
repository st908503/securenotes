import { api } from "../../utils/api";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "./types";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return response.data;
};


export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return response.data;
};