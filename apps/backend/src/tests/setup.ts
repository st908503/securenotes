import mongoose from "mongoose";

import { connectDB } from "../config/db";

beforeAll(async () => {
  await connectDB();
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});