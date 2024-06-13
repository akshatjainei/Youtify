const axios = require('axios');
const querystring = require('querystring');


async function getAccessToken() {
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
  
  async function searchTrack(query) {
    const accessToken = await getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?${querystring.stringify({ q: query, type: 'track', limit : 1})}`;
    const headers = {
      'Authorization': 'Bearer ' + accessToken
    };
  
    const response = await axios.get(searchUrl, { headers });

    let trackIds = [];
    if (response.data.tracks && response.data.tracks.items) {
        trackIds = response.data.tracks.items.map(track => track.id)
    } else {
      throw new Error('Unexpected response structure');
    }
    return trackIds
  }
  


module.exports = searchTrack