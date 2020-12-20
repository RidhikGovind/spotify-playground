require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:8888/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
const PORT = process.env.PORT || 8888;


if (process.env.NODE_ENV !== "production") {
  REDIRECT_URI = "http://localhost:8888/callback";
  FRONTEND_URI = "http://localhost:3000";
}

const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const queryString = require("querystring");
//a small middelware to change the URL path to the specified path without affecting the /index.html path
const history = require("connect-history-api-fallback");
const cluster = require("cluster");
const CPUNumber = require("os").cpus().length;
const request = require("request");
const { dirname } = require("path");

const generateRandomString = (length) => {
  let text = "";
  const randoms =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += randoms.charAt(Math.floor(Math.random() * randoms.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

if (cluster.isMaster) {
  console.warn(`node cluster ${process.pid} is running`);

  for (let i = 0; i < CPUNumber; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(`node cluster worker ended`);
  });
} else {
  const app = express();

  app.use(express.static(path.resolve(__dirname, "/client/build")));
  app.use(cors());
  app.use(cookieParser());
  app.use(
    history({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: "/login" },
        { from: /\/callback/, to: "/callback" },
        { from: /\/refresh_token/, to: "/refresh_token" },
      ],
    })
  );

  app.use(express.static(path.resolve(__dirname, "/client/build")));

  app.get("/", (req, res) => {
    res.render(path.resolve(__dirname, "/client/build/index.html"));
  });

  //after login callback has been authorized, it is redirected to the '/callback' path below
  app.get("/login", (req, res) => {
    const stateValue = generateRandomString(16);
    res.cookie(stateKey, stateValue); //(name_of_the_cookie, cookie_value) - format for setting cookies

    const scope =
      "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

    res.redirect(
      `https://accounts.spotify.com/authorize?${queryString.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: stateValue,
      })}`
    );
  });

  //After login in authorized a 'code' and a 'state' is returned which we will use for requesting access and refresh tokens
  //**IMPRTNT**: we are also checking if(localStatekey == state key returned). This provides protection against attacks such as cross-site request forgery
  app.get("/callback", (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state == null || state !== storedState) {
      res.redirect(
        `/#${queryString.stringify({ error: "state_not_matching" })}`
      );
    } else {
      res.clearCookie(stateKey);

      // const formData = new FormData();
      // formData.append('code', code)
      // formData.append('redirect_uri', REDIRECT_URI)
      // formData.append('grant_type', 'authorization_code')

      const options = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization: `Basic ${new Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        json: true,
      };

      request.post(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          res.redirect(
            `${FRONTEND_URI}/#${queryString.stringify({
              access_token,
              refresh_token,
            })}`
          );
        } else {
          res.redirect(
            `/#${queryString.stringify({ error: "invalid_token" })}`
          );
        }
      });

      // axios
      // .post(url, formData, options)
      // .then((response) => {
      //   if (response.status === 200) {
      //     const access_token = response.access_token;
      //     const refresh_token = response.refresh_token;

      //     res.redirect(
      //       `${FRONTEND_URI}/#${queryString.stringify({
      //         access_token,
      //         refresh_token,
      //       })}`
      //     )
      //   } else{
      //     res.redirect(`/#${queryString.stringify({error : 'invalid token'})}`)
      //   }
      // })
      // .catch((err) => console.log("error while using axios POST (callback)",err));
    }
  });

  //5.From spotify.js the path hits this 'route handler' (/refresh_token)
  app.get("/refresh_token", (req, res) => {
    const refresh_token = req.query.refresh_token;
    const url = "https://accounts.spotify.com/api/token";

    //   const options = {
    //     headers: {
    //       "Authorization": `Basic ${new Buffer.from(
    //         `${CLIENT_ID}:${CLIENT_SECRET}`
    //       ).toString("base64")}`,
    //       "Content-Type": "application/json",
    //     },
    //   };

    //   // **not a good way
    //   // const data = {
    //   //   grant_type: "refresh_token",
    //   //   refresh_token: refresh_token,
    //   // };

    //   const formData = new FormData();
    //   formData.append('grant_type', 'refresh_token')
    //   formData.append('refresh_token', refresh_token)

    //   //making a post request to get the access token and sending it back to the /refresh_token path back to spotify.js
    //   axios
    //     .post(url, formData, options)
    //     .then((response) => {
    //       if (response.status === 200) {
    //         const access_token = response.access_token;
    //         res.send({ access_token });
    //       }
    //       console.log("something happened during POST axios")
    //       return;
    //     })
    //     .catch((err) => console.log("error while using axios POST (refresh_token)",err));
    // }

    const options = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: `Basic ${new Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      form: {
        grant_type: "refresh_token",
        refresh_token,
      },

      json: true,
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({ access_token });
      }
    });
  });

  app.get("*", (req, res) => {
    // *ONE MAJOR CHANGE DONE HERE*
    // res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
     res.sendFile(path.resolve(__dirname, "/client/public/index.html"));

  });

  app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
}


