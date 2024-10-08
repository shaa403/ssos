
"use strict";

import { homedir } from "node:os";
import { join } from "node:path";

export const root = join(homedir(), ".ssos");
export const completed_setup = join(root, "._comp_s");
export const usr_info = join(root, "usr");
