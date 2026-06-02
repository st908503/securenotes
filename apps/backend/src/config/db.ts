import mongoose from "mongoose";
import { env } from "./env";

const MONGO_URI = env.mongoUri;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) {
    console.log("♻️ Using cached Mongo connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Creating new Mongo connection");
    cached.promise = mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      serverSelectionTimeoutMS: 60000,
      waitQueueTimeoutMS: 60000,
      retryWrites: true,
      retryReads: true,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    cached.promise = null;
    throw error;
  }
};