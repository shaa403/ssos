
"use strict";

import batteryLevel from "battery-level";
import isCharging from "is-charging";
import { networkInterfaces } from "node:os";
import res_construct from "../api/res.js";

export async function get_battery_status(response) {
  let lvl;
  await batteryLevel((_,num)=> lvl = num);
  const ischarging= await isCharging();
  response.statusCode = 200;
  response.end(res_construct(true, null, { lvl, ischarging  }));
}


export function get_net_stats(response) {
  const net_interfaces = Object.keys(networkInterfaces()).map(intfc => intfc.toLowerCase());
  let isConnectedToAnotherNet;	
  if ( 
       net_interfaces.includes("wlo1") || 
       net_interfaces.includes("eth0") ||
       net_interfaces.includes("en0") ||
       net_interfaces.includes("ethernet") ||
       net_interfaces.includes("wi-fi") ||
       net_interfaces.includes("wifi")
     ) isConnectedToAnotherNet = true
  else isConnectedToAnotherNet = false;
  response.statusCode = 200;
  response.end(res_construct(true, null, isConnectedToAnotherNet));
}
