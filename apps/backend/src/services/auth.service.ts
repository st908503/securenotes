import { User } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
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
  const existingUser = await User.findOne({ email });

  if (existingUser) {
   throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken({
    userId: user._id.toString(),
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const loginUser = async ({
  email,
  password,
}: LoginInput) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
  throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordMatched = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordMatched) {
   throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken({
    userId: user._id.toString(),
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};