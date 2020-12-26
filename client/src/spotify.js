import axios from "axios";
import hash from "./hash";

//Doing stuff with tokens
const tokenExpiry = 600 * 1000; //600s converted to ms by *1000 = 10mins

//setting various tokens
const setTokenTimestamp = () =>
  window.localStorage.setItem("s-token-timestamp", Date.now());

const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("s-access-token", token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem("s-refresh-token", token);

//getting various tokens
const getTokenTimestamp = () =>
  window.localStorage.getItem("s-token-timestamp");
const getLocalAccessToken = () => window.localStorage.getItem("s-access-token");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("s-refresh-token");

//3.called from getAccessToken() function.
const refreshAccessToken = async () => {
  try {
    //4.axios hits the '/refresh_token' path right to the index.js(server) file which does the rest- go there
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (err) {
    console.log(err);
  }
};

//2.Next up is this function below
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = hash;

  //any error handled
  if (error) {
    console.log(error);
    refreshAccessToken();
  }

  //incase the token has expired then again calling for another refresh_token
  if (Date.now() - getTokenTimestamp() > tokenExpiry) {
    refreshAccessToken();
  }

  //first we set the values in the local storage to separate variables
  const localRefreshToken = getLocalRefreshToken();
  const localAccessToken = getLocalAccessToken();

  //set we check if the values are there in the Localstorage, if they aren't there then we set it using the 'token' values from have received from params
  if (!localRefreshToken || localRefreshToken === "undefined") {
    setLocalRefreshToken(refresh_token);
  }

  //same step but for access token
  if (!localAccessToken || localAccessToken === "undefined") {
    setLocalAccessToken(access_token);
    return access_token;
  }

  //then we return the localAccessToken because we need its imported in <Login /> component where we satisfy a condition to display the <Main /> component
  return localAccessToken;
};

//1.this token is called in app.js and also used for setting the localstorage values for refresh and access token(see line 10 and 14)
export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("s-access-token");
  window.localStorage.removeItem("s-access-token");
  window.localStorage.removeItem("s-refresh-token");
  window.location.reload();
};

//API calls section

//first we set the mandatory headers needed to make the api calls with the token
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const getUserDeets = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

export const getNewReleases = () =>
  axios.get("https://api.spotify.com/v1/browse/new-releases", { headers });

export const getFeaturedPlaylists = () =>
  axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
    headers,
  });

export const getUsersPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

export const getUsersArtists = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    { headers }
  );

export const getArtist = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

export const getUsersSavedTracks = () =>
  axios.get(
    "https://api.spotify.com/v1/me/tracks?market=IN&limit=20&offset=0",
    { headers }
  );

export const getUsersTopTracks = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=0",
    { headers }
  );
