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


if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;