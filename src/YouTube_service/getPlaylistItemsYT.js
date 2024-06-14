const { google } = require('googleapis');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config()

app.use(bodyParser.json());

async function getPlaylistItems(playlistId) {
  const youtube = google.youtube('v3');
  try {
    const res = await youtube.playlistItems.list({
      part: 'snippet,contentDetails',
      playlistId: playlistId,
      maxResults: 50, 
      key: process.env.YOUTUBE_KEY
    });
    fs.writeFileSync('playlistItems.json', JSON.stringify(res.data.items));

  } catch (err) {
    console.error('Error fetching playlist items:', err);
  }
  
}


module.exports = getPlaylistItems