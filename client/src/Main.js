import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home/Home";
import Playlists from "./Playlists/Playlists";
import Header from "./Header/Header";

function Main() {
  return (
    <Router>
      <div className="Main">
        <div className="content">
          <Header />
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/playlists">
            <Playlists />
          </Route>
          
        </div>
      </div>
    </Router>
  );
}

export default Main;
