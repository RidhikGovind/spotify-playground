import React, { useState, useEffect } from "react";
import "./FavouriteSongs.css";
import { getUsersSavedTracks } from "../spotify";

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
            {items.slice(0, 19).map(({ track}, i) => (
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
                    {/* {track.artists.map((artist) => (
                      <span className="artistname" >{artist.name}</span>
                    ))} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouriteSongs;
