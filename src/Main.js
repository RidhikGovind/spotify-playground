import React from "react";

const showMenu = () => {
    
}

export default function Main() {
  return (
    <div className="Main">
        <div className="menuSideBar"></div>
      <div className="header">
          <div className="leftHeader">
              <div className="menuIcon" onClick={() => showMenu()}>=</div>
          </div>

          <div className="rightHeader">
              <div className="profileName">Name</div>
          <div className="profileImage"></div>
          <div className="logoutBtn"><a href="#">Logout</a></div>
          </div>
         
      </div>

      <div className="mainGrid">
          <div className="nav">Nav</div>
      <div className="body">Body</div>
      </div>
      
    </div>
  );
}
