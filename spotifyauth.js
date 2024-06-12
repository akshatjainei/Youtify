const express = require('express')
const app = express()
const http = require('http')
const crypto = require('crypto')
const PORT = 3200
const querystring = require('querystring');


const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


const codeVerifier  = generateRandomString(64);


var client_id = '97c64a77d36d4febad6f6ec913457976';
var redirect_uri = 'http://localhost:3100';

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


const server = http.createServer(app);
server.listen(PORT)

