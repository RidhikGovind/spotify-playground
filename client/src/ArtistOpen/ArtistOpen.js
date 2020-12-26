import React, { useState, useEffect } from "react";
import "./ArtistOpen.css";
import { getArtist } from "../spotify";
import PropTypes from "prop-types";

function ArtistOpen({ match: { params } }) {
  const [item, setItem] = useState("");


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getArtist(params.artistId);
    setItem(data);
  
    // console.log( data );
  };

  return (
    <div className="Artist">
      <div className="artistImage">
        <img
        className="artistCoverImg"
        src={item.images ? item.images[1].url : ""}
        alt="Artist Cover Img"
      />
      </div>
      
      <div className="artistDetails">
        <div className="artistName">{item.name}</div>

        <div className="artistPopularity">
          <span className="bold">Popularity: </span>
          {item.popularity}
        </div>
        <div className="artistFollowers">
          <span className="bold">Followers: </span>
          {item.followers ? item.followers.total: ""}
        </div>

        <div className="artistGenres">
          <span className="bold">Genres: </span>
          {item.genres ? item.genres.slice(0,2).map(genre =>
            <div className="genreName">
              <span >{genre}</span>
            </div> ) : ""}
        </div>
      </div>
    </div>
  );
}

export default ArtistOpen;
