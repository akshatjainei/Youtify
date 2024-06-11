const express = require('express')
const http = require('http')
const fs = require('fs')
const getPlaylistItems = require('./getPlaylistItemsYT')
const app = express()
const PORT = 3100

getPlaylistItems('PLoJUIP1KAPN1XgwIpciDnsqkrMpz14Z-u')

app.get('/' , (req , res)=>{
    const playlistItems = JSON.parse(fs.readFileSync('playlistItems.json'));
    res.json(playlistItems);
})
  
const server = http.createServer(app);
server.listen(PORT)
  