import { useEffect, useState } from "react";
import { getSpotifyAuthUrl, getTokenFromUrl } from "./Auth";
//import {getLikedSongs} from "./LikedSongs"; // Import the LikedSongs component

function App() {
  const [accessToken, setAccessToken] = useState(null);

  // Handle authentication and extract the access token from URL
  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      setAccessToken(token);
      window.location.hash = ""; // Clear the URL hash
    }
  }, []);

  // Redirect to Spotify for login /*console.log<LikedSongs accessToken={accessToken} /> {/* Add the LikedSongs component */}*/
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div>
      <h1>Spotify Playlist Organizer</h1>
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <h2>You are logged in!</h2>
        
        </div>
      )}
    </div>
  );
}

export default App;