
"use strict";

import { existsSync, readFileSync, rmSync} from "node:fs";
import { join } from "node:path";
import { root } from "../etc/addresses.js";

console.log("WARNING: This will destroy the current instance of ssOS.");

const lock_path = join(root, ".lock");

if (existsSync(lock_path)) { 
    let lock_content = readFileSync(lock_path, "ascii");
    lock_content = lock_content.split("->");
    try {
      process.kill(Number(lock_content[0]));
    } catch(error) { 
      console.log("An error occured while trying to destroy PID %s :", lock_content[0]);
      console.log("\t%s", error.message);
    }
   rmSync(lock_path);
   console.log("[completed] you can now try restarting the OS");
   process.exit(0);
} 

console.log("[message] no instance to destroy");
