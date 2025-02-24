// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express, { urlencoded } from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import categoryRoute from "./routes/category.route.js";
// import messageRoute from "./routes/message.route.js";
// import postRoute from "./routes/post.route.js";
// import userRoute from "./routes/user.route.js";
// import { app, server } from "./socket/socket.js";
// import connectDB from "./utils/db.js";

// // Load environment variables
// dotenv.config();

// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json()); // Parse incoming JSON payloads
// app.use(cookieParser()); // Parse cookies
// app.use(urlencoded({ extended: true })); // Parse URL-encoded data

// // Configure CORS
// // const corsOptions = {
// //   origin: "*",
// //   credentials: true,
// // };
// // app.use(cors(corsOptions));

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // Frontend URL
// //     methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
// //     credentials: true, // Allow credentials (cookies, headers, etc.)
// //   })
// // );

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // Your frontend URL
// //     credentials: true, // Allow cookies and authorization headers
// //   })
// // );

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

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
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect to Database
connectDB();

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/uploads", express.static("public/uploads"));

// 404 Not Found Route
app.use((req, res) => {
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

// ✅ Export `app` and `server` for testing
export { app, server };

// // Connect to Database
// connectDB();
// // Set static folder
// // Define __dirname manually
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // API Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/post", postRoute);
// app.use("/api/v1/message", messageRoute);
// app.use("/api/v1/category", categoryRoute);

// // Catch-all Route for Undefined Endpoints
// app.use((req, res, next) => {
//   res.status(404).json({ message: "API route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// // Start the Server
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// import bodyParser from "body-parser";
// import "colors";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import mongoSanitize from "express-mongo-sanitize"; // for SQL injection
// import helmet from "helmet";
// import morgan from "morgan";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import xss from "xss-clean";
// import authRoutes from "./routes/user.route.js";
// import connectDB from "./utils/db.js";

// const app = express();

// app.use(cors());
// app.options("*", cors());

// // Load env file
// dotenv.config();

// // Connect to database
// connectDB();

// // Body parser
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Dev logging middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // Sanitize data
// app.use(mongoSanitize());

// // Set security headers
// app.use(helmet());

// // Prevent XSS attacks
// app.use(xss());

// // Get the current directory path in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Serve static files from "public" folder
// app.use(express.static(path.join(__dirname, "public")));

// // Mount routers
// app.use("/api/v1/auth", authRoutes);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () =>
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`.red);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });
