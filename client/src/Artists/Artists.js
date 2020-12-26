import React, { useState, useEffect } from "react";
import "./Artists.css";
import { getUsersArtists } from "../spotify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Artists() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getUsersArtists();
    setItems(data.items);
    // console.log(data);
  };

  return (
    <div className="Artists">
      <h2 className="title">Top Artists</h2>
      <h3>Only the best of the voices you love</h3>
      <div className="topArtistsSection">
        {Array.isArray(items) && (
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
        )}
      </div>
    </div>
  );
}

export default Artists;
