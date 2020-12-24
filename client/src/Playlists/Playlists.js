import React, { useState, useEffect } from "react";
import "./Playlists.css";
import { getUsersPlaylists } from "../spotify";

function Playlists() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getUsersPlaylists();
    // console.log(data);
    setItems(data.items);

    // console.log(data);
    // setItems(data.playlists.items);
  };
  return (
    <div className="Playlists">
      <h2 className="title"> Playlists</h2>
      <div className="PlaylistsSection">
        {Array.isArray(items) && (
          <div className="grid">
            {items
              .slice(0, 20)
              .map(({ description, images, name, id, owner }, i) => (
                <div className="details" key={i}>
                  <img
                    className="albumCoverImg"
                    src={images[0].url}
                    alt="playlist cover"
                  />
                  <div className="name">{name}</div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlists;
