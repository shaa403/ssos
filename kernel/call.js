
"use strict";

import res_construct from "./res.js";
import { lock_setup } from "../boot/interface.js";
import { get_users } from "../api/usr.js";

/**
 * This interface handles calls to the server (kernel). It does not follow the REST standard,
 * but rather a very minimal GRAPHQL-like approach.
 * All requests to this interface MUST be made to the root URL (/), with the HTTP POST METHOD and a "call"
 * field in the request payload. requests that does not comply with the above messages will be ended with 
 * a 204 HTTP response.
 */
export default function handle_call(request, response) {
  if (request.url === "/" && request.method === "POST" && request.body.call) {
    response.setHeader("Content-Type", "application/json");
    const call = request.body.call;
    if (call === "_SETUP") lock_setup(request, response);  	
    if (call === "GETUSERS") get_users(request, response); 
    else {
      response.statusCode = 403;   
      response.end(res_construct(false, "UNKNOWN_KERNEL_CALL"));	
    }; 
  } else {
    response.statusCode = 204;
    response.end();	
  }
}
