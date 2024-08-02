const mongoose = require('mongoose');

// Define the schema for Camera
const cameraSchema = new mongoose.Schema({
  name: String,
  imgurl: String,
  price: Number
});

// Create a model based on the schema
const Camera = mongoose.model('datas', cameraSchema);

module.exports = Camera;