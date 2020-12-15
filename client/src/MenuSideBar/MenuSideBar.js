import React from "react";
import "./MenuSideBar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function MenuSideBar() {
  return (
   
      <div className="MenuSideBar">
          <nav>
              <ul>
                  <li>
                      <Link to='/'>Home</Link>
                  </li>
                  <li>
                      <Link to='/playlists'>Playlists</Link>
                  </li>
              </ul>
          </nav>
      </div>
    
  );
}

export default MenuSideBar;
