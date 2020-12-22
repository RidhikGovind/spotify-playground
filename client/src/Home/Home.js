import React from "react";
import "./Home.css";
import NewReleases from "../NewReleases/NewReleases";
import FeaturedPlaylists from "../FeaturedPlaylists/FeaturedPlaylists";

function Home() {
  return (
    <div className="Home">
      <h2 className="home-title">Home</h2>
      <div className="grid-home">
        <NewReleases />
        <FeaturedPlaylists />
      </div>
    </div>
  );
}

export default Home;
