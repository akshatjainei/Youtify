const express = require('express')
const http = require('http')
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs')
const getPlaylistItems = require('./YouTube_service/getPlaylistItemsYT')
const searchTrack = require('./Spotify _service/search')
require('dotenv').config()

const app = express()
const PORT = 8888

app.use(bodyParser.json())

getPlaylistItems('PLoJUIP1KAPN1XgwIpciDnsqkrMpz14Z-u')

let YouTubePlaylistTrack = []
const playlistItems = JSON.parse(fs.readFileSync('playlistItems.json'))
const itemlength = playlistItems.length
console.log(itemlength)
try{
    let i = 0
    while(i<itemlength){
        YouTubePlaylistTrack.push(playlistItems[i].snippet.title)
        i++
    }
    console.log(YouTubePlaylistTrack)
}
catch(err){
    console.log({msg : err})
}

const trackIdsArray = []
async function fetchAllTrackIds() {
    const promises = []

    for (let i = 0; i < itemlength; i++) {
        const query = YouTubePlaylistTrack[i]
        const promise = searchTrack(query)
            .then(trackIds => {
                trackIdsArray.push("spotify:track:"+trackIds) 
            })
            .catch(error => {
                console.error('Error:', error.message);
            });

        promises.push(promise); 
    }

    await Promise.all(promises); 
    return trackIdsArray; 
}

fetchAllTrackIds().then(allTrackIds => {
    console.log('All Track IDs:', allTrackIds)
}).catch(error => {
    console.error('Error fetching all track IDs:', error.message)
});

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/callback'
  });
  
  const scopes = ['playlist-modify-public', 'playlist-modify-private'];
  
  app.get('/login', (req, res) => {
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
  });
  
  app.get('/callback', async (req, res) => { 
    const code = req.query.code || null;
  
    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const accessToken = data.body['access_token'];
      const refreshToken = data.body['refresh_token'];
  
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);
  
      res.send('Successfully authenticated! You can now create playlists.');
    } catch (err) {
      console.error('Error getting Tokens:', err);
      res.send('Error during authentication');
    }
  });
  
  app.post('/create-playlist', async (req, res) => {
    const { name, description, public } = req.body;
  
    try {
      const me = await spotifyApi.getMe();
      // console.log('User info:', me.body);

      const newPlaylist = await spotifyApi.createPlaylist(req.body.name, { 'description': req.body.description, 'public': req.body.public})
    
      // console.log(newPlaylist.body.id)
      res.send('Created new Playlist')
  
      await spotifyApi.addTracksToPlaylist(newPlaylist.body.id, trackIdsArray,{
        position : 0
      })
        .then(function(data) {
        console.log('Added tracks to playlist!');
        }, function(err) {
        console.log('Something went wrong!', err);
        });
    }

    catch(err){
      console.log({msg : err})
    }
     
  });

const server = http.createServer(app);
server.listen(PORT)
  