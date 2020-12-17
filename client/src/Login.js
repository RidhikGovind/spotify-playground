import React from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";

export default function Login() {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/login"
      : "https://spotify-playground.herokuapp.com/login";

      
  return (
    // <a
    //   href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    //     "%20"
    //   )}&response_type=token&show_dialog=true`}
    // >

    <a href={LOGIN_URI}>
      Login
    </a>
  );
}
