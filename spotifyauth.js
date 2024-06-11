const express = require('express')
const app = express()
const http = require('http')
const PORT = 3200
const querystring = require('querystring');

var client_id = process.env.id;
var redirect_uri = 'http://localhost:3100';

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


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

