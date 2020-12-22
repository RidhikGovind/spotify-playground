import React, { useState, useEffect } from "react";
import { logout } from "../spotify";
import "./Header.css";
import { getUserDeets } from "../spotify";
import { MenuItems } from "./MenuItems";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const onClickHideScrollbar = (value) => {
  // console.log(value);
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
    <div className="header">
      <div className="leftHeader">
        <div className="menuIcon" onClick={() => handleClicked()}>
          <i className={clicked ? "" : "fas fa-bars fa-2x"}></i>
        </div>
      </div>
      <div className={clicked ? "menusidebar show " : "menusidebar "}>
        <i className="fas fa-times fa-2x close" onClick={ handleClicked}></i>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className="menuLinks"to={item.endpoint}>{item.title}</Link>
          </li>
        ))}
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
