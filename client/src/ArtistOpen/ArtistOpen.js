import React, { useState, useEffect } from "react";
import "./ArtistOpen.css";
import { getArtist } from "../spotify";
import PropTypes from 'prop-types'

function ArtistOpen({artistId}) {

 

  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getArtist(artistId);
    // setItems(data.items);
    console.log(data);
  };

  return (
    <div className="Artists">
      <h2 className="title">Artist</h2>
      <div className="topArtistsSection">
        {/* {Array.isArray(items) && (
          <div className="grid">
            {items
              .slice(0, 30)
              .map(({ name, images,id }, i) => (
                <div className="details" key={i}>
                  <Link to={`/artist/${id}`}>
                  {<img
                    className="albumCoverImg"
                    src={images[0].url}
                    alt="artist cover"
                  />}
                  </Link>
                  
                  <div className="name">{name}</div>
                </div>
              ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

ArtistOpen.propTypes = {
  artistId: PropTypes.string,
}

export default ArtistOpen;
