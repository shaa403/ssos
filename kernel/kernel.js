
"use strict";

import conf from "../etc/conf.js";
import cors from "./cors.js";
import { createServer } from "node:http";

const listencb = port => console.log("Running the system on http://localhost:%s", port);	

const start = port => {
   conf().set("port", port);
   createServer(cors).listen(port, ()=> listencb(port));
}

export default start;

start(8080);
