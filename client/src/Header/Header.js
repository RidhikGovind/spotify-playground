import React, { useState, useEffect } from "react";
import { logout } from "../spotify";
import "./Header.css";
import { getUserDeets } from "../spotify";

export default function Header() {
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleClicked = () => {
    setClicked(!clicked);
  };

  const getData = async () => {
    try {
      const { data } = await getUserDeets();
      setUserData(data);
      // console.log(data)
    } catch {
      console.log("yoyo");
    }
  };

  return (
    <div className="header">
      <div className="leftHeader">
        <div className="menuIcon" onClick={() => handleClicked()}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>

      <div className="rightHeader">
        <div className="profileName">{userData.display_name}</div>
        <div className="profileImage">
          {userData.images ? (
            <img src={userData.images[0].url} alt="blah" />
          ) : null}
        </div>
        <div className="logoutBtn">
          <a href="#" onClick={() => logout()}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
