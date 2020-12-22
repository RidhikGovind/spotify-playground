import React, { useState, useEffect } from "react";
import "./styles.css";
import Login from "./Login";
import Player from "./Player";
import EmptyPlayer from "./EmptyPlayer";
import Main from './Main'
import hash from "./hash";

import {token} from './spotify'

export default function App() {
  const [_token, setToken] = useState("");
  // const [name, setName] = useState("");
  // const [popularity, setPopularity] = useState("");
  // const [albumCover, setAlbumCover] = useState("");

  // const [isPlaying, setIsPlaying] = useState("paused");
  // const [progress, setProgress] = useState(0);
  // const [noData, setNoData] = useState(false);

  // useEffect(() => {
  //   let token = hash.access_token;
  //   console.log(token);
  //   if (token) {
  //     setToken(token);

  //     getCurrentlyPlaying(token);
  //   }
  // }, []);

  //**first setting the token received to a _token state */
  useEffect(() => {
    setToken(token)
  },[])

  //WILL BE MOVING THIS TO SPOTIFY.JS SOON
  // const getCurrentlyPlaying = async (token) => {
  //   const url = "https://api.spotify.com/v1/me/player";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   const response = await fetch(url, options);
  //     if(response.status === '204') {
  //       console.log('No song being played.')
  //       return;
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setNoData(true);
  //     setName(data.item.name);
  //     setIsPlaying(data.is_playing);
  //     setPopularity(data.item.popularity);
  //     setAlbumCover(data.item.album.images[0].url);
    
  // };

  return (
    <div className="App">
      {/* *below are the main */}
     {!_token && <Login />}
      {_token && <Main />} 
      {/* **main */}


      {/* {_token ? <Main /> : <Login />} */}
      {/* { <Main />} */}
      {/* {_token && noData && (
        <Player name={name} isPlaying={isPlaying} albumCover={albumCover} />
      )}
      {_token && !noData && <EmptyPlayer />} */}
    </div>
  );
}


