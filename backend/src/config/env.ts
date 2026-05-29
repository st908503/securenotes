import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = ["PORT", "MONGO_URI", "JWT_SECRET"];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: process.env.PORT as string,
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  clientUrl: process.env.CLIENT_URL as string,
};
