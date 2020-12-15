import React from "react";
import "./Player.css";

export default function Player({ name, isPlaying, albumCover }) {
  return (
    <div className="Player">
      <img className="albumCover" src={albumCover} />
      <div className="songDetails">
        <h2 className="songName">{name}</h2>
        <h3 className="playpause">{isPlaying ? "Playing" : "Paused"}</h3>
      </div>
    </div>
  );
}
