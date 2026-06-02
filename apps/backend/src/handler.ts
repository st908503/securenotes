import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/db";
import { Request, Response } from "express";



export const handler = serverless(async (req: Request, res: Response) => {
  console.log("🔥 HANDLER CALLED");
  await connectDB();
  return app(req, res);
});