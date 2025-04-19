// Import Mongoose for MongoDB modeling
import mongoose from 'mongoose';

// Define the schema for contact form submissions
const contactSchema = new mongoose.Schema(
  {
    // Name of the person submitting the form
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    
    // Email address of the sender
    email: {
      type: String,
      required: true,
      lowercase: true, // Converts email to lowercase
    },

    // Message content from the contact form
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Contact model using the schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the model to use in controllers
export default Contact;
