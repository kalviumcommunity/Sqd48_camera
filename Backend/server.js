const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config()
const mongoose = require('mongoose')

// define the ping route with the response in JSON
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

mongoose.connect(process.env.mongoURI, {})

app.get('/', (req, res) => {
  res.send(`connected status : ${mongoose.connection.readyState===1 ? 'connected':'disconnected'}`);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}


module.exports = app;
