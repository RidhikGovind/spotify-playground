import React, { useState, useEffect } from "react";
import "./Track.css";
import { getTrack } from "../spotify";

function Track({ match: { params } }) {
  const [item, setItem] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getTrack(params.trackId);

    setItem(data);
    console.log(item);
  };

  return (
    <div className="Track">
      <div className="trackSection">
        {item ? (
          <div className="trackGrid">
            <div className="trackDetailsLeft">
              <img
                className="trackCoverImg"
                src={item.album.images ? item.album.images[1].url : ""}
                alt="albumcover"
              />
              <div className="trackName">{item.name}</div>
              <div className="trackArtistsName">{item.artists[0].name}</div>
            </div>

            <div className="trackDetailsRight">
              <div>
                <span className="bold">Popularity: </span>
                {item.popularity}
              </div>

              <div>
                <span className="bold">Album: </span>
                {item.album.name}
              </div>

              <div>
                <span className="bold">Release Date: </span>
                {item.album.release_date}
              </div>

              <div>
                <span className="bold">Total Tracks: </span>
                {item.album.total_tracks}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Track;
