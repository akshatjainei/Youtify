# YouTube to Spotify Playlist Transfer

This Node.js project transfers tracks from a YouTube playlist to a newly created Spotify playlist. It uses OAuth 2.0 for authentication with YouTube Data API v3 and Spotify Web API. The app retrieves YouTube tracks, searches for them on Spotify, creates a new Spotify playlist, and adds the found tracks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/akshatjainei/Youtify.git
   cd Youtify
   cd src
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3.Set up environment variables in a .env file:
   ```sh
   YOUTUBE_KEY=your_youtube_api_key
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   PORT : 8888
  ```
## Usage
1.Start the Application
  ```sh
  node app.js
 ```
2.Open your browser and navigate to http://localhost:PORT/login to authenticate with Spotify.

3.Use a tool like Postman to make a POST request to http://localhost:PORT/create-playlist with the YouTube playlist ID, the desired Spotify playlist name, description, and public status:
 ```json
{
  "name": "Testv1",
  "description": "A description for my new playlist",
  "public": false
}
```
## Configuration
Make sure to set up your API keys and secrets in the .env file as shown in the Installation section. You can obtain these from the Google Developers Console and the Spotify Developer Dashboard.
License
This project is licensed under the MIT License.

## License
This project is licensed under the MIT License.




