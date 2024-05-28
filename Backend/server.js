require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const routes = require("./routes");
const cors = require('cors');

// const { userValidationSchema } = require('./models/validator.js');
const cookieParser = require("cookie-parser");
app.use(express.json());

const { userValidationSchema } = require('./models/validator.js');
const cookieParser = require("cookie-parser");


app.use(cors());
app.use(cookieParser());


app.use('/',routes)


mongoose.connect(process.env.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/mongodbconnection', async (req, res)=>{
  try{
    if(mongoose.connection.readyState === 1){
      res.send("Connected to DB")
  }}catch(err){
    res.send("Connection to DB failed")
  }

})

});

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Set username to cookie upon signup
    res.cookie('username', email, { httpOnly: true });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Clear cookie by setting it to an empty string and setting maxAge to 0
  res.clearCookie('username', { httpOnly: true, maxAge: 0 });
  res.status(200).json({ message: 'Logout successful' });
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




if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;