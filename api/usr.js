
"use strict";

import { existsSync, readFileSync } from "node:fs";
import res_construct from "../kernel/res.js";
import { usr_info } from "../etc/addresses.js";


export function get_users(request, response) {
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
