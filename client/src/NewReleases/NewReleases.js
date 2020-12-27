import React, { useState, useEffect } from "react";
import "./NewReleases.css";
import { getNewReleases } from "../spotify";
import { Link } from "react-router-dom";

function NewReleases() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getNewReleases();

    // console.log(data.albums.items);
    setItems(data.albums.items);
  };

  return (
    <div className="NewReleases">
      <h2 className="title">New Releases</h2>
      <div className="newReleasesSection">
        {Array.isArray(items) && (
          <div className="newReleasesGrid">
            {items.slice(0, 10).map(({ artists, images, name, id }, i) => (
              <div className="newReleasesDetails" key={i}>
                
                <Link to={`/album/${id}`}>
                 <img
                  className="newReleasesCoverImg"
                  src={images[1].url}
                  alt="newReleases album cover"
                />
                </Link>
               

                <div className="newReleasesName">{name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default NewReleases;

{
  /* <div className="NewReleasesGrid">
        {albumData ? (
          <ul className="album">
            {albumData.items
              .slice(0, 10)
              .map((artists, images, name, id) => (
                <li key={id}>
                  <div className="albumCover">
                    <img
                      src={images.length > 0 ? images[2].url : ""}
                      alt="albumCoverImage"
                    />
                  </div>
                  <div className="albumDetails">
                    <div className="albumName">{name ? name : ""}</div>
                    <div className="artistName">
                      {artists[0].name ? artists[0].name : ""}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          ""
        )}
      </div> */
}
