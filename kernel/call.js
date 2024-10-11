
"use strict";

import res_construct from "./res.js";
import { lock_setup } from "../boot/interface.js";
import { get_battery_status, get_net_stats } from "../api/sys.js";
import { get_users, signin, verify_user } from "../api/usr.js";

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
    else if (call === "GETUSERS") get_users(request, response);
    else if (call === "SIGNIN") signin(request, response);
    else if (call === "VERIFYUSER") verify_user(request, response, false);
    else if (call === "GET_BATTERY_STATUS") get_battery_status(request, response);
    else if (call === "GET_NET_STATUS") get_net_stats(response);
    else {
      response.statusCode = 403;
      response.end(res_construct(false, "UNKNOWN_SYS_CALL"));
    };
  } else {
    response.statusCode = 204;
    response.end();
  }
}
