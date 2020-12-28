import React, { useState, useEffect } from "react";
import "./Album.css";
import { getAlbum } from "../spotify";
import { Link } from "react-router-dom";

function Album({ match: { params } }) {
  const [item, setItem] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getAlbum(params.albumId);
    setItem(data);
    setTracks(data.tracks.items);

    // console.log(tracks);
    console.log(data);
  };

  return (
    <div className="Album">
      <div className="albumGrid">
        <div className="albumDetailsLeft">
          <div className="albumImage">
            <img
              className="albumCoverImage"
              src={item.images ? item.images[1].url : ""}
              alt="Album Cover Img"
            />
          </div>
          <div className="albumName">{item.name}</div>
          <div className="albumArtistsName">
            {item.artists ? item.artists[0].name : ""}
          </div>
        </div>
        <div className="albumDetailsRight">
          <h2>Tracks</h2>
          {tracks
            ? tracks.map(({ name, id },i) => (
              <Link to={`/track/${id}`} key={i}>
                  <div className="albumTrackDetails">
                    <div className="albumTrackName">{name}</div>
                </div>
                  </Link>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Album;
