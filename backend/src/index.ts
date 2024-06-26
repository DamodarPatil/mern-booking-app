import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose
  .connect(uri as string)
  .then(() => {
    console.log("Connected to Database(MongoDB)");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("server running on localhost:3000");
});
