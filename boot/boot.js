
"use strict";

import { completed_setup, root } from "../etc/addresses.js";
import conf from "../etc/conf.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import start from "../kernel/kernel.js";

/** 
 * ssb: Shaa's Shitty Bootloader
 * This acts as the bootloader of this application, and is responsible for performing file system checks,
 * as well as booting the os (starting the server...).
 */
export default function ssb() {
  if (!existsSync(root)) mkdirSync(root);
  const port = process.argv[2] ? Number(process.argv[2]) : 14500;
  
  const lock = {
     content: `${process.pid}->${Date.now()}->${port}`,
     path: join(root, ".lock")
  }
  
  if (existsSync(lock.path)) { 
    let lock_content = readFileSync(lock.path, "ascii");
    lock_content = lock_content.split("->");
    console.log(
      "This application cannot be started because it is being held by PID %s, since %s", 
      lock_content[0],
      new Date(Number(lock_content[1]))
    );
  	console.log(
  	 "You can still access ssOS via port %s, or run `npm run ssbfree` to destroy the current instance.", 
  	 lock_content[2]
    );
  	process.exit(1);
  } 
  
  writeFileSync(lock.path, lock.content, "ascii");
  conf().set("isSetup", existsSync(completed_setup) ? false : true);
  conf().set("rootdir", process.cwd());
  start(port);
}

ssb();
