const express = require('express')
const http = require('http')
const fs = require('fs')
const getPlaylistItems = require('./getPlaylistItemsYT')
const searchTrack = require('./search')
const app = express()
const PORT = 3100

getPlaylistItems('PLoJUIP1KAPN1XgwIpciDnsqkrMpz14Z-u')

let YouTubePlaylistTrack = []
const playlistItems = JSON.parse(fs.readFileSync('playlistItems.json'));
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

for(let i =0 ; i < itemlength ; i++){
    const query = YouTubePlaylistTrack[i]
    searchTrack(query).then(trackIds => {
        console.log('Track IDs:', trackIds); 
        }).catch(error => {
        console.error('Error:', error.message);
    });
}

const server = http.createServer(app);
server.listen(PORT)
  