// userModel.js

const mongoose = require('mongoose');

// Check if the model already exists before defining it
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
    loginAttempts: {
      type: Number,
      default: 0
  },
    lockUntil: Number
  }
);
  
const User = mongoose.model("user", userSchema);
module.exports= User;
  

