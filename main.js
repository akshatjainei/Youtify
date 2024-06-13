const express = require('express')
const http = require('http')
const fs = require('fs')
const getPlaylistItems = require('./getPlaylistItemsYT')
const app = express()
const PORT = 3100

getPlaylistItems('PLoJUIP1KAPN1XgwIpciDnsqkrMpz14Z-u')

let YouTubePlaylistIds = []
const playlistItems = JSON.parse(fs.readFileSync('playlistItems.json'));
try{
    const itemlength = playlistItems.length
    let i = 0
    while(i<itemlength){
        YouTubePlaylistIds.push(playlistItems[i].snippet.title)
        i++
    }
    console.log(YouTubePlaylistIds)
}
catch(err){
    console.log({msg : err})
}
  
const server = http.createServer(app);
server.listen(PORT)
  