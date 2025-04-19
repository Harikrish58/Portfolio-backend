// Import Mongoose for MongoDB interactions
import mongoose from "mongoose";

// Define the schema for the admin user
const adminSchema = new mongoose.Schema({
  // Admin's username
  username: {
    type: String,
    required: true,    // Field is mandatory
    unique: true       // Ensures no duplicate usernames
  },

  // Admin's password (should be stored as a hashed string)
  password: {
    type: String,
    required: true
  }
});

// Create the Admin model from the schema
const Admin = mongoose.model("Admin", adminSchema);

// Export the model to be used in the authentication controller
export default Admin;
