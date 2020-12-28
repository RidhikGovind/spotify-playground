import React, { useState, useEffect } from "react";
import "./styles.css";
import Login from "./Login/Login";
import Main from "./Main";
import { token } from "./spotify";

export default function App() {
  const [_token, setToken] = useState("");

  useEffect(() => {
    setToken(token);
  }, []);

  return (
    <div className="App">
      {!_token && <Login />}
      {_token && <Main />}
    </div>
  );
}
