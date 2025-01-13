import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { urlencoded } from "express";
import categoryRoute from "./routes/category.route.js";
import messageRoute from "./routes/message.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import { app, server } from "./socket/socket.js";

import connectDB from "./utils/db.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse incoming JSON payloads
app.use(cookieParser()); // Parse cookies
app.use(urlencoded({ extended: true })); // Parse URL-encoded data

// Configure CORS
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to Database
connectDB();

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/category", categoryRoute);

// Catch-all Route for Undefined Endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
