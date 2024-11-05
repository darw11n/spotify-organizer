import { getSpotifyAuthUrl } from "../Auth";

const Home = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div>
      <h2>Welcome to Spotify Playlist Organizer</h2>
      <p>
        This tool helps you organize your liked songs on Spotify by iterating
        through them like a queue and allowing you to add each song to a
        playlist.
      </p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;