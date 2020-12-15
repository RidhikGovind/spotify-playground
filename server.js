require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5000/callback'
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000'
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:5000/callback';
    FRONTEND_URI = 'http://localhost:3000';
}

const express = require('express')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const queryString = require('querystring')
//a small middelware to change the URL path to the specified path without affecting the /index.html path
const history = require('connect-history-api')


const generateRandomString = (length) => {
    let text = ''
    const randoms = ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789;

    for(let i=0; i<length; i++) {
        text += randoms.charAt(Math.floor(Math.random()*randoms.length))
    }
    return text;
}

const stateKey = 'spotify_auth_state'

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/public')))
app.use(cors())
app.use(cookieParser())
app.use(history({
    verbose:true,
    rewrites: [
        {from: /\/login/, to: '/login'},
        {from: /\/callback/, to: '/callback'},
        {from: /\/refresh_token/, to: '/refresh_token'}

    ]
}))

app.use(express.static(path.resolve(__dirname, '../client/public')))

app.get('/', (req,res) => {
    res.render(path.resolve(__dirname, '../client/public/index.html'))

})

app.get('/login', (req,res) => {
    const stateValue = generateRandomString(16)
    res.cookie(stateKey,stateValue)

    const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public'

    res.redirect(
        
    )
})