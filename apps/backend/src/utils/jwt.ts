import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
}

const accessTokenOptions: SignOptions = {
  expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
};

const refreshTokenOptions: SignOptions = {
  expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"],
};

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload,

    env.jwtSecret as Secret,

    accessTokenOptions,
  );
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload,

    env.jwtRefreshSecret as Secret,

    refreshTokenOptions,
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,

    env.jwtSecret as Secret,
  ) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,

    env.jwtRefreshSecret as Secret,
  ) as JwtPayload;
};
