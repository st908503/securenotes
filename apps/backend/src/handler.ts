import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/db";

export const handler = serverless(async (req, res) => {
  await connectDB();   // MUST happen here
  return app(req, res);
});