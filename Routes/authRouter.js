// Import required modules
import express from "express";
import { loginAdmin, registerAdmin } from "../Controllers/authController.js";

// Initialize Express router
const router = express.Router();

// Route to handle admin login
// Public route – used to authenticate admin and issue a token
router.post("/login", loginAdmin);

// Route to handle admin registration
// Disabled in production – returns a 403 Forbidden response
router.post("/register", (req, res) => {
  res.status(403).json({
    message: "Registration is disabled",
  });
});

// Export the router to be used in the main app
export default router;
