import  { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LikedSongs = ({ accessToken }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const totalResponse = await fetch(`https://api.spotify.com/v1/me/tracks?limit=1`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!totalResponse.ok) {
          throw new Error("Failed to fetch liked songs");
        }

        const data = await totalResponse.json();
        const total = data.total;
        let count = 0;
        while(count < total){
          try {
            const likedSongsResponse = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${count}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            if (!likedSongsResponse.ok) {
              throw new Error("Failed to fetch liked songs");
            }
    
            const data = await likedSongsResponse.json();
            setLikedSongs(prevSongs => [...prevSongs, ...data.items]);
            count += data.items.length;
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      
      
    };
    fetchLikedSongs();


  }, [accessToken]);

  if (loading) return <p>Loading liked songs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Liked Songs</h2>
      <ul>
        {likedSongs.map(({ track }) => (
          <li key={track.id}>
            <p>{track.name} by {track.artists.map(artist => artist.name).join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes for LikedSongs component
LikedSongs.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default LikedSongs;