import React, { useState, useEffect } from "react";
import "./Playlists.css";
import { getUsersPlaylists } from "../spotify";

function Playlists() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
     const res= await getUsersPlaylists();
     console.log(res.data.item.images[0].url)

    // console.log(data);
    // setItems(data.playlists.items);
  };
  return (
    <div className="Playlists">
      <h2 className="title"> Playlists</h2>
      <div className="PlaylistsSection">
        {/* {Array.isArray(items) && (
          <div className="featuredPlaylistsGrid">
            {items.slice(0, 10).map(({ description, images, name, id }) => (
              <div className="playlistDetails" key={id}>
                <img
                  className="albumCoverImg"
                  src={images[0].url}
                  alt="albumcover"
                />
                <div className="playlistName">{name}</div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Playlists;
