const CLIENT_ID = 'your-client-id';
const REDIRECT_URI = 'http://localhost:5173/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-library-read user-read-playback-state user-modify-playback-state playlist-modify-public playlist-modify-private`;

function App() {
  return (
    <div>
      <a href={loginURL}>Login to Spotify</a>
    </div>
  );
}