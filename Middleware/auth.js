// Import required dependencies
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandler } from "../Utils/Error.js";

// Load environment variables from .env file
dotenv.config();

/**
 * Middleware to verify JWT token for protected routes.
 * Checks for a token in the Authorization header or fallback from 'token' header.
 * If valid, attaches the user info to req.user and proceeds.
 */
export const verifyToken = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.headers.authorization;

  // Get token from "Bearer <token>" or fallback to custom header
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.headers.token;

  // If token is missing, return unauthorized error
  if (!token) {
    return next(errorHandler(401, "Unauthorized - Token missing"));
  }

  // Verify the token using the secret key from environment variables
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Invalid or expired token"));
    }

    // Attach user info to the request object
    req.user = {
      id: user.id || user._id,         // Use either id or _id based on how token was created
      isAdmin: user.isAdmin || false,  // Add admin flag if available
    };

    // Proceed to the next middleware or controller
    next();
  });
};
