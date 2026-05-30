import { User } from "../models/user.model";

import {
  comparePassword,
  hashPassword,
} from "../utils/bcrypt";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

import { ApiError } from "../lib/ApiError";

interface RegisterInput {
  name: string;

  email: string;

  password: string;
}

interface LoginInput {
  email: string;

  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  const existingUser =
    await User.findOne({
      email,
    });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  const hashedPassword =
    await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    user: {
      id: user._id,

      name: user.name,

      email: user.email,
    },
  };
};

export const loginUser = async ({
  email,
  password,
}: LoginInput) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isPasswordMatched =
    await comparePassword(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const accessToken =
    generateAccessToken({
      userId:
        user._id.toString(),
    });

  const refreshToken =
    generateRefreshToken({
      userId:
        user._id.toString(),
    });

  return {
    user: {
      id: user._id,

      name: user.name,

      email: user.email,
    },

    accessToken,

    refreshToken,
  };
};