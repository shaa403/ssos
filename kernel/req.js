
"use strict";

import body_parser from "./body-parser.js";
import handle_call from "./call.js";
import handle_graphic_call from "./graphic.js";
import res_construct from "./res.js"; 

/**
 * This function identifies the kind of request (call) recieved by the kernel(server), and passes it 
 * to it's appropriate handler.
 */
export default function cb(request, response) {
  try {
    request.url = decodeURIComponent(request.url);
    const isNotGraphicCall = request.headers["x-call-type"] === "ng";

    if (isNotGraphicCall) body_parser(request, response, handle_call);      
    else {
       if (request.method === "GET") handle_graphic_call(request, response);
       else {
         response.statusCode = 405;
         response.setHeader("Allow", "GET"); //As specified as rfc 2616;
         response.setHeader("Content-Type", "application/json");
         response.end(res_construct(false, "GET required"));
       }     	
    }   
  } catch (error) { 
    response.statusCode = 500;
    response.setHeader("Content-Type", "application/json");
    response.end(res_construct(false, error.message));
  }
}
