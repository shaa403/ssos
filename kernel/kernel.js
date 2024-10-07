
"use strict";

import cors from "./cors.js";
import { createServer } from "node:http";

const listencb = port => console.log("Running the system on http://localhost:%s", port);	

const start = port => createServer(cors).listen(port, ()=> listencb(port));

export default start;
