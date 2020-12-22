import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home/Home";
import Playlists from "./Playlists";
import Header from './Header/Header'

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

// {/* <div className="header">
//   <div className="leftHeader">
//     <div className="menuIcon" onClick={() => handleClicked()}>
//       <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
//     </div>
//   </div>

//   <div className="rightHeader">
//     <div className="profileName">Name</div>
//     <div className="profileImage"></div>
//     <div className="logoutBtn">
//       <a href="#">Logout</a>
//     </div>
//   </div>
// </div>

// <div className="mainGrid">
//   <div className="sidebar">Nav</div>
//   <div className="body">Body</div>
// </div> */}
