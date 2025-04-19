// Importing required packages
import mongoose from "mongoose"; // For connecting to MongoDB
import dotenv from "dotenv"; // For loading environment variables

// Load environment variables from .env file into process.env
dotenv.config();

// MongoDB connection string retrieved from environment variable
const mongodb_URL = process.env.MONGODB_URL;

// Function to connect to MongoDB using mongoose
export const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    const connection = await mongoose.connect(mongodb_URL);

    // If successful, log to the console
    console.log("MongoDB connected successfully");

    // Return the connection object (optional, in case needed)
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process on DB error
  }
};
