// Import the Contact model and custom error handler utility
import Contact from "../Models/contactModel.js";
import { errorHandler } from "../Utils/Error.js";

/**
 * Controller: Handle contact form submission
 * @route   POST /api/contact/submit
 * @desc    Receives and stores contact form data
 */
export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    // Create new contact document
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save to database
    await newContact.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      contact: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        message: newContact.message,
      },
    });
  } catch (error) {
    // Handle unexpected errors
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

/**
 * Controller: Get all contact form submissions
 * @route   GET /api/contact/all
 * @desc    Fetches all submitted contact messages (admin-only route)
 */
export const getAllContacts = async (req, res, next) => {
  try {
    // Retrieve all contacts, sorted by most recent
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // Handle case if no contacts exist
    if (!contacts || contacts.length === 0) {
      return next(errorHandler(404, "No contacts found"));
    }

    // Send response with contact data
    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    // Handle unexpected errors
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};
