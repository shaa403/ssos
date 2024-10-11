
"use strict";

import conf from "../etc/conf.js";
import { existsSync, readFileSync } from "node:fs";
import { randalphabets } from "../etc/rand.js";
import res_construct from "../api/res.js";
import { usr_info } from "../etc/addresses.js";


export function get_users(response) {
  let users = [];
  if (existsSync(usr_info)) {
    users = readFileSync(usr_info, "ascii");
    users = users.split("\n");
    users = users.map(user => {
      return user.split("\t")[0];	
    });
  }
  response.statusCode = 200;
  response.end(res_construct(true, null, users));
}

export function signin(request, response) {
  const CONF = conf();
  let existingSession =
     CONF.get("sessions").find(session_info => session_info?.user === request.body?.user);  
  if (!existingSession) {
     let { user, password } = request.body;
     let isVerifiedUser = false;  
     if (user && password && existsSync(usr_info)) {
        let users = readFileSync(usr_info, "ascii");	
        users = users.split("\n");
        for (let n = 0; n < users.length; ++n) {
            const user_info = users[n].split("\t");
            if (user_info[0] === user && user_info[1] === password) {
               isVerifiedUser = true;
               break;
            }
        }
     }	   
     if (isVerifiedUser) { 
        const sessionid = user + "-" + randalphabets(10);
        CONF.set_sessions({ user, id: sessionid });
        response.statusCode = 200;
        response.end(res_construct(true, null, sessionid));  	
     } else {
        response.statusCode = 401;
        response.end(res_construct(false, 1));  
        // 1 signifies that the request is unauthorized because the user information does not match 
        // any existing record.
     }
  } else {
     response.statusCode = 401;
     response.end(res_construct(false, -1));
     // -1 signifies that the request is unauthorized because there is already an active session. 
  }
}

export function verify_user(request, response, next) {
  const { id } = request.body;
  const user = conf().get("sessions").find(u => u.id === id);
  if (user && next) { 
    next(request, response, user);
  } else if (user && !next) { 
    response.statusCode = 200;
    response.end(res_construct(true, null, null)); 
  } else {
    response.statusCode = 401;
    response.end(res_construct(false, "INVALID_CREDENTIALS"));	
  }	
}
