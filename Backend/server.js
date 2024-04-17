const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();
const mongoose = require('mongoose');
const Camera = require('./models/data');
const User = require('./models/users');
const SellCamera = require('./models/selldata');
const routes = require("./routes");
const cors = require('cors');

app.use("/", routes);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Route to fetch cameras for the landing page
app.get('/cameras', async (req, res) => {
  try {
    const cameras = await Camera.find();
    res.json(cameras);
  } catch (error) {
    console.error('Error retrieving cameras:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to add a new camera to the landing page
app.post('/cameras', async (req, res) => {
  try {
    const { name, imgurl, price } = req.body;
    const newCamera = new Camera({ name, imgurl, price });
    await newCamera.save();
    res.status(200).json({ message: 'Camera added successfully' });
  } catch (error) {
    console.error('Error adding camera:', error);
    res.status(500).json({ error: 'Failed to add camera' });
  }
});

// Route to fetch sell cameras for the sell page
app.get('/sell-cameras', async (req, res) => {
  try {
    const sellCameras = await SellCamera.find();
    res.json(sellCameras);
  } catch (error) {
    console.error('Error retrieving sell cameras:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to add a new sell camera to the sell page
app.post('/sell-cameras', async (req, res) => {
  try {
    const { name, imgurl, price } = req.body;
    const newSellCamera = new SellCamera({ name, imgurl, price });
    await newSellCamera.save();
    res.status(200).json(newSellCamera);
  } catch (error) {
    console.error('Error adding sell camera:', error);
    res.status(500).json({ error: 'Failed to add sell camera' });
  }
});

// Route to delete a sell camera
app.delete('/sell-cameras/:id', async (req, res) => {
  try {
    const cameraId = req.params.id;
    const deletedCamera = await SellCamera.findByIdAndDelete(cameraId);
    if (!deletedCamera) {
      return res.status(404).json({ message: 'Camera not found' });
    }
    res.status(200).json({ message: 'Camera removed successfully' });
  } catch (error) {
    console.error('Error removing camera:', error);
    res.status(500).json({ error: 'Failed to remove camera' });
  }
});

// Endpoint to update a sell camera
app.put('/sell-cameras/:id', async (req, res) => {
  try {
      const { name, imgurl, price } = req.body;
      const { id } = req.params;
      await SellCamera.findByIdAndUpdate(id, { name, imgurl, price });
      res.json({ message: 'Sell camera updated successfully' });
  } catch (error) {
      console.error('Error updating sell camera:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to serve the SellForm.jsx file for updating a sell camera
app.get('/update-sell-camera/:id', (req, res) => {
  res.sendFile(__dirname + '/path/to/UpdateSellCameraForm.jsx'); // Replace 'path/to/UpdateSellCameraForm.jsx' with the actual path
});

// Listen on specified port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
