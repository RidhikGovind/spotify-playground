import React, { useState, useEffect } from "react";
import "./FavouriteSongs.css";
import { getUsersSavedTracks } from "../spotify";
import { Link } from "react-router-dom";

function FavouriteSongs() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getUsersSavedTracks();

    // console.log(data);
    setItems(data.items);
  };

  return (
    <div className="FavouriteSongs">
      <h2 className="title">Favourite Songs</h2>
      <h3>Songs so good you clicked the heart</h3>
      <div className="favouriteSongsSection">
        {Array.isArray(items) && (
          <div className="favouriteSongsGrid">
            {items.slice(0, 19).map(({ track }, i) => (
              <Link to={`/track/${track.id}`} className="link" key={i}>
              <div className="favouriteSongsDetails" key={i}>
                  <div className="albumImgSection">
                    <img
                      className="songCoverImg"
                      src={track.album.images ? track.album.images[2].url : ""}
                      alt="albumcover"
                    />
                  </div>
                

                <div className="songDetails">
                  <div className="songName">{track.name}</div>
                  <div className="songArtistsName">
                    {track.artists[0].name}
                    
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouriteSongs;
