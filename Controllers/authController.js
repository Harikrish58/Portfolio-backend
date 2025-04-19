// Import necessary modules and the Admin model.
import Admin from "../Models/AdminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandler } from "../Utils/Error.js";

// Load environment variables from .env file.
dotenv.config();

// Controller function for registering a new admin user.
export const registerAdmin = async (req, res, next) => {
  try {
    // Extract username and password from the request body.
    const { username, password } = req.body;
    // Check if both username and password are provided.
    if (!username || !password) {
      // If not, pass an error to the error handling middleware.
      return next(errorHandler(400, "Please provide username and password"));
    }

    // Check if an admin with the given username already exists in the database.
    const existingAdmin = await Admin.findOne({ username });
    // If an admin with the username exists, return an error.
    if (existingAdmin) {
      return next(errorHandler(409, "Admin already exists"));
    }

    // Hash the provided password using bcryptjs for security.
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Create a new Admin model instance with the provided username and hashed password.
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    // Save the new admin user to the database.
    await newAdmin.save();

    // Respond with a success status and a message, including the new admin's ID and username.
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
      },
    });
  } catch (error) {
    // If any error occurs during the process, pass it to the error handling middleware.
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

// Controller function for logging in an existing admin user.
export const loginAdmin = async (req, res, next) => {
  try {
    // Extract username and password from the request body.
    const { username, password } = req.body;
    // Check if both username and password are provided.
    if (!username || !password) {
      // If not, pass an error to the error handling middleware.
      return next(errorHandler(400, "Please provide username and password"));
    }

    // Find an admin user in the database with the provided username.
    const admin = await Admin.findOne({ username });
    // If no admin is found with the given username, return an error.
    if (!admin) {
      return next(errorHandler(404, "Admin not found"));
    }

    // Compare the provided password with the hashed password stored in the database.
    const isPasswordValid = await bcryptjs.compare(password, admin.password);

    // If the passwords do not match, return an authentication error.
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password"));
    }

    // If the username and password are valid, create a JWT token.
    const token = jwt.sign(
      { id: admin._id, isAdmin: true }, // Payload containing admin ID and isAdmin flag.
      process.env.JWT_SECRET_KEY, // Secret key for signing the token (from environment variables).
      { expiresIn: "1h" } // Token expiration time set to 1 hour.
    );

    // Respond with a success status, a login success message, and the generated JWT token.
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    // If any error occurs during the login process, pass it to the error handling middleware.
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};
