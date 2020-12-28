import React, { useState, useEffect } from "react";
import "./Playlist.css";
import { getPlaylist } from "../spotify";
import { Link } from "react-router-dom";

function Playlist({ match: { params } }) {
  const [item, setItem] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getPlaylist(params.playlistId);

    setItem(data);
    setTracks(data.tracks.items);
    // console.log(data);
    console.log(tracks)
  };

  return (
    <div className="Playlist">
      {item ? (
        <div className="playlistGrid">
          <div className="playlistDetailsLeft">
            <img
              className="playlistCoverImg"
              src={item.images ? item.images[0].url : ""}
              alt="playlistcover"
            />
            <div className="playlistName">{item.name}</div>
            <div className="playlistDescription">{item.description}</div>
            <div className="playlistFollowers">Followers: {item.followers.total ? item.followers.total : ""}</div>
          </div>

          <div className="playlistDetailsRight">
            {tracks.map(({ track }, i) => (
              <div className="playlistTrackDetails" key={i}>
                <Link to={`/track/${track.id}`} className="link">
                  <div className="playlistTrackName">{track.name}</div>
                  <div className="playlistTrackArtistName">
                    {track.artists[0] ? track.artists[0].name : ""}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Playlist;
