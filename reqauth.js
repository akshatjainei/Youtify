const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const searchTrack = require('./search')
require('dotenv').config()

const app = express();
app.use(bodyParser.json());



const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});