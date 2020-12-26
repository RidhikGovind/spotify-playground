import React, { useState, useEffect } from "react";
import "./FeaturedPlaylists.css";
import { getFeaturedPlaylists } from "../spotify";
import { getUsersPlaylists } from "../spotify";

function FeaturedPlaylists() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getFeaturedPlaylists();

    // console.log(data.playlists.items);
    setItems(data.playlists.items);
  };

  return (
    <div className="FeaturedPlaylists">
      <h2 className="title">Featured Playlists</h2>
      <div className="featuredPlaylistsSection">
        {Array.isArray(items) && (
          <div className="featuredPlaylistsGrid">
            {items.slice(0, 10).map(({ description, images, name, id }, i) => (
              <div className="playlistDetails" key={i}>
                <img
                  className="albumCoverImg"
                  src={images[0].url}
                  alt="albumcover"
                />
                <div className="playlistName">{name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedPlaylists;
