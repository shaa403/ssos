
"use strict";

import { completed_setup, usr_info, root } from "../etc/addresses.js";
import conf from "../etc/conf.js";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { randalphabets } from "../etc/rand.js";
import res_construct from "../api/res.js";


export function lock_setup(request, response) {
  let { username, password } = request.body;
  if (!username) username = randalphabets(10);	
  if (!password) password = "123456";

  if (!existsSync(completed_setup)) {
     writeFileSync(completed_setup, "");
     mkdirSync(join(root, username));
     writeFileSync(usr_info, `${username}\t${password}`, "ascii");
     conf().set("isSetup", false);
  }

  response.statusCode = 200;
  response.end(res_construct(true, null, null));
}
