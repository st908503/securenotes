import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/db";

export default serverless(async (req:any, res:any) => {
  console.log("🔥 HANDLER CALLED");
  console.log("🔥 CONNECTING TO MONGO");

  await connectDB();

  console.log("🚀 REQUEST HANDLING STARTED");

  return app(req, res);
});