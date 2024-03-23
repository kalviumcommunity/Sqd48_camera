const mongoose = require('mongoose');

// Define the schema for Camera
const cameraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imgurl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create a model based on the schema
const Camera = mongoose.model('data', cameraSchema);

module.exports = Camera;