import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: process.env.PORT as string,

  mongoUri: process.env.MONGO_URI as string,

  jwtSecret: process.env.JWT_SECRET as string,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,

  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  clientUrl: process.env.CLIENT_URL as string,
};
