import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState('');
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.localStorage.setItem("token", token);
      window.location.hash = "";
    }

    setToken(token);

    spotifyApi.setAccessToken(token);

    // Fetch liked songs
    spotifyApi.getMySavedTracks({ limit: 50 })
      .then(response => {
        setLikedSongs(response.items);
      })
      .catch(err => console.error(err));

    // Fetch user playlists
    spotifyApi.getUserPlaylists()
      .then(response => {
        setPlaylists(response.items);
      })
      .catch(err => console.error(err));
  }, []);

  const handlePlaySong = (songId) => {
    spotifyApi.play({ uris: [`spotify:track:${songId}`] })
      .then(() => setCurrentSong(songId))
      .catch(err => console.error('Error playing song:', err));
  };

  const handleAddToPlaylist = (playlistId, songId) => {
    spotifyApi.addTracksToPlaylist(playlistId, [`spotify:track:${songId}`])
      .then(() => console.log('Song added to playlist'))
      .catch(err => console.error('Error adding song to playlist:', err));
  };

  return (
    <div>
      <h1>Organize Your Liked Songs</h1>
      {likedSongs.map((song) => (
        <div key={song.track.id}>
          <p>{song.track.name} by {song.track.artists[0].name}</p>
          <button onClick={() => handlePlaySong(song.track.id)}>Play</button>
          <select onChange={(e) => handleAddToPlaylist(e.target.value, song.track.id)}>
            <option value="">Select Playlist</option>
            {playlists.map((playlist) => (
              <option value={playlist.id} key={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default App;