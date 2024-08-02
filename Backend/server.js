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
