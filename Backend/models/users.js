const mongoose = require('mongoose');

// Define the schema for Camera
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

});

// Create a model based on the schema
const User = mongoose.model('users', userSchema);

module.exports = User;