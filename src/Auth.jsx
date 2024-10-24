export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "e31b7ea3feae47da8b6a6cc8b441accf"; // Replace with your own Spotify client ID
const redirectUri = "http://127.0.0.1:5173/callback"; // Replace with your app’s URL
const scopes = [
  "user-library-read",
  "playlist-modify-public",
  "playlist-modify-private",
];

// Build the full URL for Spotify auth
export const getSpotifyAuthUrl = () => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
};

// Get the token from the URL hash
export const getTokenFromUrl = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  return params.get("access_token");
};