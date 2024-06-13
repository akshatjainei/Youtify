const axios = require('axios');
const querystring = require('querystring');

async function getAccessToken(clientId , clientSecret) {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    };
    const data = {
      grant_type: 'client_credentials'
    };
  
    const response = await axios.post(tokenUrl, querystring.stringify(data), { headers });
    return response.data.access_token;
}

module.exports = getAccessToken