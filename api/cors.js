
"use strict";

import cb from "./req.js";
import conf from "../etc/conf.js";

export default function cors(request, response) { 
  response.setHeader("Access-Control-Allow-Origin", `http://localhost:${conf().get("port")}`);
  response.setHeader("Access-Control-Allow-Headers", "*");
  
  if (request.method === "OPTIONS") {
  	 response.statusCode = 204;
  	 response.setHeader("Access-Control-Allow-Methods", "*");
  	 response.setHeader("Access-Control-Max-Age", "86400");
  	 response.end();
  } else
     cb(request, response);	
} 
