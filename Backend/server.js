const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();
const mongoose = require('mongoose');
const Camera = require('./models/data'); // Import the Camera model
const routes = require("./routes");
const cors = require('cors');
app.use("/", routes);
app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Serve camera data
app.get('/cameras', async (req, res) => {
  try {
    const cameras = await Camera.find(); // Retrieve all cameras from the database
    console.log('Cameras:', cameras); // Log retrieved cameras
    res.json(cameras);
  } catch (error) {
    console.error('Error retrieving cameras:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/cameras', async (req, res) => {
  try {
    const { name, imgurl, price } = req.body;

    // Create a new camera document
    const newCamera = new Camera({
      name,
      imgurl,
      price,
    });

    // Save the new camera to the database
    await newCamera.save();

    res.status(200).json({ message: 'Camera added successfully' });
  } catch (error) {
    console.error('Error adding camera:', error);
    res.status(500).json({ error: 'Failed to add camera' });
  }
});

// Check MongoDB connection status
app.get('/', (req, res) => {
  res.send(`Connected status: ${mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'}`);
});



if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
