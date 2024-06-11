const { google } = require('googleapis');
const express = require('express')
const app = express()
const PORT = 3100
const bodyParser = require('body-parser');
const http = require('http')

app.use(bodyParser.json());

async function getPlaylistItems(playlistId) {
  const youtube = google.youtube('v3');

  try {
    const res = await youtube.playlistItems.list({
      part: 'snippet,contentDetails',
      playlistId: playlistId,
      maxResults: 50, 
      key: process.env.API_KEY
    });
    console.log(res.data.items)
    return (res.data.items.body); 

  } catch (err) {
    console.error('Error fetching playlist items:', err);
  }
}

app.get('/' , (req , res)=>{
  var objAsString = JSON.stringify(getPlaylistItems('PLoJUIP1KAPN1XgwIpciDnsqkrMpz14Z-u'))
  res.send(objAsString)
})

const server = http.createServer(app);
server.listen(PORT)

module.exports = getPlaylistItems