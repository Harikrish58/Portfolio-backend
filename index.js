// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Database/config.js";

// Import route handlers
import authRoute from "./Routes/authRouter.js";
import contactRoute from "./Routes/contactRouter.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS to allow requests from frontend
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Base route for testing server status
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Register authentication-related routes
app.use("/api/auth", authRoute);

// Register contact form-related routes
app.use("/api/contact", contactRoute);

// Global error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT");
  });
});
