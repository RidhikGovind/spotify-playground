import React, { useState, useEffect } from "react";
import "./FeaturedPlaylists.css";
import { getFeaturedPlaylists } from "../spotify";
import { Link } from "react-router-dom";

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
              <div className="featuredplaylistDetails" key={i}>
                <Link to={`/playlist/${id}`}>
                  <img
                    className="featuredPlaylistCoverImg"
                    src={images[0].url}
                    alt="albumcover"
                  />
                </Link>
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
