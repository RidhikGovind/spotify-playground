import React from "react";
import "./Home.css";
import NewReleases from "../NewReleases/NewReleases";
import FeaturedPlaylists from "../FeaturedPlaylists/FeaturedPlaylists";

function Home() {
  return (
    <div className="Home">
      <h2 className="title">Home</h2>
      <h3>Explore Spotify as a whole</h3>
      <div className="grid-home">
        <NewReleases />
        <FeaturedPlaylists />
      </div>
    </div>
  );
}

export default Home;
