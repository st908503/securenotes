import { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service";

import { asyncHandler } from "../utils/asyncHandler";

import {
  generateAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";

// REGISTER
export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: result.user,
    },
  });
});

// LOGIN
export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

// REFRESH TOKEN
export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      userId: decoded.userId,
    });

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  }
);

// LOGOUT
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});