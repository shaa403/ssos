
"use strict";

import res_construct from "./res.js";

/**
 * This interface handles calls to the server (kernel). It does not follow the REST standard,
 * but rather a very minimal GRAPHQL-like approach.
 * All requests to this interface MUST be made to the root URL (/), with the HTTP POST METHOD and a "call"
 * field in the request payload. requests that does not comply with the above messages will be ended with 
 * a 204 HTTP response.
 */
export default function handle_call(request, response) {
  if (request.url === "/" && request.method === "POST" && request.body.call) {
    console.log(request.body); 
  } else {
    response.statusCode = 204;
    response.end();	
  }
}
