import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home/Home";
import Playlists from "./Playlists/Playlists";
import Artists from "./Artists/Artists";
import ArtistOpen from "./ArtistOpen/ArtistOpen";
import FavouriteSongs from "./FavouriteSongs/FavouriteSongs";
import TopTracks from "./TopTracks/TopTracks";
import Track from "./Track/Track";
import Header from "./Header/Header";

function Main() {
  return (
    <Router>
      <div className="Main">
        <div className="content">
          <Header />
          <Route exact path="/" component={Home}></Route>

          <Route path="/playlists" component={Playlists}></Route>

          <Route path="/artists" component={Artists}></Route>

          <Route path="/artist/:artistId" component={ArtistOpen}></Route>

          <Route path="/favouriteSongs" component={FavouriteSongs}></Route>

          <Route path="/topTracks" component={TopTracks}></Route>

          <Route path="/track/:trackId" component={Track}></Route>
        </div>
      </div>
    </Router>
  );
}

export default Main;
