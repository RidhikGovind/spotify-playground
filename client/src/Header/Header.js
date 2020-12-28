import React, { useState, useEffect } from "react";
import { logout } from "../spotify";
import "./Header.css";
import { getUserDeets } from "../spotify";
import { MenuItems } from "./MenuItems";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const onClickHideScrollbar = (value) => {
  return value;
};

export default function Header() {
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleClicked = () => {
    setClicked(!clicked);
    onClickHideScrollbar(clicked);
  };

  const getData = async () => {
    try {
      const { data } = await getUserDeets();
      setUserData(data);
      // console.log(data)
    } catch {
      console.log("error while fetching user profile data");
    }
  };

  return (
    <div className="Header">
      <div className="leftHeader">
        <div className="menuIcon" onClick={() => handleClicked()}>
          <i className={clicked ? "" : "fas fa-bars fa-2x"}></i>
          <h2 className="app-title">Spotify Playground</h2>
        </div>
      </div>

      <div className={clicked ? "menusidebar show " : "menusidebar "}>
        <i className="fas fa-times fa-2x close" onClick={handleClicked}></i>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className="menuLinks" to={item.endpoint}>
              {item.title}
            </Link>
          </li>
        ))}
        <div className="makerInfo">
          Made with <i className="fa fa-heart"></i> by{" "}
          <a href="http://ridhikgovind.netlify.app/" target="_blank">
            Ridhik Govind
          </a>
        </div>
      </div>

      <div className="rightHeader">
        <div className="profileSection">
          <div className="profileName">{userData.display_name}</div>
          <div className="profileImage">
            {userData.images ? (
              <img
                src={userData.images[0] ? userData.images[0].url : ""}
                alt=":)"
              />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="sideIcons">
          <i className="fa fa-sign-out" onClick={() => logout()}></i>
        </div>
        <div className="sideIcons">
          <a href="https://github.com/RidhikGovind" target="_blank">
            <i className="fa fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
