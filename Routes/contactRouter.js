// Import required modules
import express from 'express';
import { verifyToken } from '../Middleware/auth.js';
import { getAllContacts, submitContactForm } from '../Controllers/contactController.js';

// Initialize Express router
const router = express.Router();

// Route to submit a contact form
// Public route – no authentication required
router.post("/submit", submitContactForm);

// Route to get all submitted contact messages
// Protected route – requires valid admin token
router.get("/all", verifyToken, getAllContacts);

// Export the router to be used in main app
export default router;
