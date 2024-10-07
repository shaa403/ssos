
"use strict";

import { homedir } from "node:os";
import { join } from "node:path";

export const root = join(homedir(), ".ssos");
