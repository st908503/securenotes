import mongoose from "mongoose";
import { env } from "./env";

const MONGO_URI = env.mongoUri;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

// FIX: cache connection across Vercel invocations
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};