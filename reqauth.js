const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

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
    console.log('User info:', me.body);
    const userId = me.body.id;

    const playlist = await spotifyApi.createPlaylist(userId, name, {
      description: description,
      public: public
    });

    console.log('Playlist creation response:', playlist.body);
    res.json(playlist.body);
  } catch (err) {
    console.error('Error creating playlist:', err);
    if (err.statusCode === 401) {
      res.status(401).send('Unauthorized. Please check your access token.');
    } else if (err.body && err.body.error) {
      res.status(err.body.error.status).send(`Error creating playlist: ${err.body.error.message}`);
    } else {
      res.status(400).send('Error creating playlist');
    }
  }
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});