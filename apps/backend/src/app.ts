import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "https://securenotes-frontend-snowy.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.use(errorMiddleware);

export default app;
