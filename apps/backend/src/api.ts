import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/db";

export default serverless(async (req:any, res:any) => {
  console.log("🔥 HANDLER CALLED");

  await connectDB();

  return app(req, res);
});