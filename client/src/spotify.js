import axios from 'axios'
import hash from './hash'

//Doing stuff with tokens
const tokenExpiry = 600 * 1000; //600s converted to ms by *1000 = 10mins

//setting various tokens 
const setTokenTimestamp = () => window.localStorage.setItem('s-token-timestamp', Date.now())
const setLocalAccessToken = (token) => {
    setTokenTimestamp();
    window.localStorage.setItem('s-access-token', token)

}
const setLocalRefreshToken = token => window.localStorage.setItem('s-refresh-token', token)

//getting various tokens
const getTokenTimestamp = () => window.localStorage.getItem('s-token-timestamp')
const getLocalAccessToken = () => window.localStorage.getItem('s-access-token')
const getLocalRefreshToken= () => window.localStorage.getItem('s-refresh-token')

//3.called from getAccessToken() function.
const refreshAccessToken = async => {
    try{
        //axios hits the '/refresh_token' path right to the index.js(server) file which does the rest- go there
        const {data} = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        const {access_token} = data;
        
    } catch(err) {
        console.log(err)
    }
}

//2.Next up is this function below 
export const getAccessToken = () => {
    const {error, access_token, refresh_token} = hash;

    if(error) {
        console.log(error);
        refreshAccessToken();
    }
}

//1.this token is called in app.js
export const token  = getAccessToken()