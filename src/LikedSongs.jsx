
export async function getLikedSongs(accessToken){
  let likedSongs = [];
      
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
          likedSongs = (prevSongs => [...prevSongs, ...data.items]);
          count += data.items.length;
        } catch (err) {
          console.log(err.message);
        }
      }
    } 
    
    catch (err) {
      console.log(err.message);
    }
    return likedSongs;
    
};


  
  