const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const searchTrack = require('./search')

const app = express();
app.use(bodyParser.json());

const spotifyApi = new SpotifyWebApi({
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

    const newPlaylist = spotifyApi.createPlaylist(req.body.name, { 'description': req.body.description, 'public': req.body.public})
    .then(function(data) {
      console.log('Created playlist!');
      res.send('Created Playlist')
    }, function(err) {
      res.send({msg : err})
      console.log('Something went wrong!', err);
    });


    spotifyApi.addTracksToPlaylist('6E7QnIDjijKOSMhtQaDgmE', [`spotify:track:6u7T2CKkuYvUFBhNlaEFv4`],
      {
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

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});