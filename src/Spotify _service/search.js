const axios = require('axios');
const querystring = require('querystring');
const getAccessToken = require('./getAccessToken')
require('dotenv').config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
  
  async function searchTrack(query) {
    const accessToken = await getAccessToken(clientId , clientSecret);
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