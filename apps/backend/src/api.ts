import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/db";

export default serverless(async (req, res) => {
  console.log("🔥 HANDLER CALLED");

  await connectDB();

  return app(req, res);
});