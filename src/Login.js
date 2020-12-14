import React from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";



export default function Login() {
return(
<a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}>Login</a>
)
}