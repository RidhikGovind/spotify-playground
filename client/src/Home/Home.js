import React from "react";
import "./Home.css";
import NewReleases from "../NewReleases/NewReleases";
import FeaturedPlaylists from "../FeaturedPlaylists/FeaturedPlaylists";

function Home() {
  return (
    <div className="Home">
      <div className="home-title">Home</div>
      <div className="grid-home">
        <NewReleases />
        <FeaturedPlaylists />
      </div>
    </div>
  );
}

export default Home;
