import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const handleClicked = () => {
    setClicked(!clicked);
  };
  const [clicked, setClicked] = useState(false);

  return (
    <div className="header">
      <div className="leftHeader">
        <div className="menuIcon" onClick={() => handleClicked()}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>

      <div className="rightHeader">
        <div className="profileName">Name</div>
        <div className="profileImage"></div>
        <div className="logoutBtn">
          <a href="#">Logout</a>
        </div>
      </div>
    </div>
  );
}
