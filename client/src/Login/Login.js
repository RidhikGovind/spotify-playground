import React from "react";
import './Login.css'

export default function Login() {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://spotifyplayground.herokuapp.com/login";

  return(
    <div className="loginSection"> 
    <h2>Spotify Playground</h2>
    <a href={LOGIN_URI} >Login</a>
    </div>
  )
   
}
