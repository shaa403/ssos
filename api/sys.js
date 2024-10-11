
"use strict";

import batteryLevel from "battery-level";
import isCharging from "is-charging";
import res_construct from "../kernel/res.js";

export async function get_battery_status(request, response) {
  let lvl;
  await batteryLevel((_,num)=> lvl = num);
  const ischarging= await isCharging();
  response.statusCode = 200;
  response.end(res_construct(true, null, { lvl, ischarging  }));
}
