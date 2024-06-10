const fs = require('fs');
const { google } = require('googleapis');
const { authorize } = require('./oauth2');

const PLAYLIST_ID = 'PLoJUIP1KAPN1XgwIpciDnsqkrMpz14Z'; // Replace with your playlist ID

fs.readFile('client_secret.json', (content,err) => {
  if (err) return console.log('Error loading client secret file:', err);
  console.log(JSON.parse(content))
  authorize(JSON.parse(content), fetchPlaylistItems);
});

function fetchPlaylistItems(auth) {
  const service = google.youtube('v3')
  service.playlistItems.list({
    auth,
    part: 'snippet',
    playlistId: PLAYLIST_ID,
    maxResults: 50,
  }, (err, response) => {
    if (err) return console.error('The API returned an error: ' + err);
    const items = response.data.items;
    if (items.length) {
      console.log('Playlist items:');
      items.forEach((item) => {
        console.log(`${item.snippet.title} (${item.snippet.resourceId.videoId})`);
      });
      fs.writeFileSync('playlist_items.json', JSON.stringify(items, null, 2));
    } else {
      console.log('No items found.');
    }
  });
}