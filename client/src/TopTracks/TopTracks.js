import React, { useState, useEffect } from "react";
import "./TopTracks.css";
import { getUsersTopTracks } from "../spotify";
import {  Link } from "react-router-dom";

function TopTracks() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getUsersTopTracks();

    // console.log(data.items);
    setItems(data.items);
  };

  return (
    <div className="TopTracks">
      <h2 className="title">Hall of fame</h2>
      <h3>Place to find all your top tracks</h3>
      <div className="topTracksSection">
        {Array.isArray(items) && (
          <div className="topTrackGrid">
            {items.slice(0, 20).map(({ album, artists, name, id }, i) => (
              <div className="topTrackDetails" key={i}>
                <div className="albumImgSection">
                  <Link to={`/track/${id}`}>
                  <img
                    className="trackCoverImg"
                    src={album.images ? album.images[1].url : ""}
                    alt="albumcover"
                  />
                  </Link>
                  
                </div>

                <div className="trackDetails">
                  <div className="topTrackName">{name}</div>
                  <div className="topTrackArtistsName">{artists[0].name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopTracks;
