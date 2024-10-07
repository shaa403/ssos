
"use strict";

import conf from "../etc/conf.js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import res_construct from "./res.js";

function get_abs_path(rootdir) {
  return conf().get("isSetup") ? join(rootdir, "screen", "setup") : join(rootdir, "screen", "main");
}

export function mimeTypeOf(trail) {
  let type_subtype;
  const extention = (n) => trail.endsWith(n);
  if (extention(".7z")) type_subtype = "application/x-7z-compressed";
  else if (extention(".js") || extention(".mjs") || extention(".cjs"))
    type_subtype = "application/javascript";
  else if (extention(".jpg") || extention(".jpeg")) type_subtype = "image/jpeg";
  else if (extention(".ico")) type_subtype = "image/x-icon";
  else if (extention(".html") || extention(".htm")) type_subtype = "text/html";
  else if (extention(".css")) type_subtype = "text/css";
  else if (extention(".json")) type_subtype = "application/json";
  else if (extention(".otf")) type_subtype = "font/otf";
  else if (extention(".ttf")) type_subtype = "font/ttf";
  else if (extention(".csv")) type_subtype = "text/csv";
  else if (extention(".svg")) type_subtype = "image/svg+xml";
  else if (extention(".mpeg") || extention(".mpg")) type_subtype = "video/mpeg";
  else if (extention(".mp2") || extention(".mp3") || extention(".mpga"))
    type_subtype = "audio/mpeg";
  else if (extention(".mp4")) type_subtype = "video/mp4";
  else if (extention(".zip")) type_subtype = "application/zip";
  else if (extention(".yml") || extention(".yaml"))
    type_subtype = "application/x-yaml";
  else if (extention(".xml")) type_subtype = "application/xml";
  else if (extention(".webp")) type_subtype = "image/webp";
  else if (extention(".webm")) type_subtype = "video/webm";
  else if (extention(".wav")) type_subtype = "audio/wav";
  else if (extention(".viv") || extention(".vivo"))
    type_subtype = "video/vnd.vivo";
  else if (extention(".tar")) type_subtype = "application/x-tar";
  else if (extention(".svr")) type_subtype = "application/x-world";
  else if (extention(".sprite")) type_subtype = "application/x-sprite";
  else if (extention(".s")) type_subtype = "text/x-asm";
  else if (extention(".rtx")) type_subtype = "text/richtext";
  else if (extention(".rgb")) type_subtype = "image/x-rgb";
  else if (extention(".png")) type_subtype = "image/png";
  else if (extention(".pic") || extention(".pict")) type_subtype = "image/pict";
  else if (extention(".gz") || extention(".gzip"))
    type_subtype = "application/gzip";
  else if (extention(".gif")) type_subtype = "image/gif";
  else if (extention(".env")) type_subtype = "application/envoy";
  else if (extention(".pdf")) type_subtype = "application/pdf";
  else if (extention(".doc")) type_subtype = "application/msword";
  else if (extention(".docx"))
    type_subtype =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  else if (extention(".xls")) type_subtype = "application/vnd.ms-excel";
  else if (extention(".xlsx"))
    type_subtype =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  else if (extention(".ppt")) type_subtype = "application/vnd.ms-powerpoint";
  else if (extention(".pptx"))
    type_subtype =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  else if (extention(".odt"))
    type_subtype = "application/vnd.oasis.opendocument.text";
  else if (extention(".ods"))
    type_subtype = "application/vnd.oasis.opendocument.spreadsheet";
  else if (extention(".epub")) type_subtype = "application/epub+zip";
  else if (extention(".midi") || extention(".mid")) type_subtype = "audio/midi";
  else if (extention(".bmp")) type_subtype = "image/bmp";
  else type_subtype = "text/plain";
  return type_subtype;
}


export default function handle_graphic_call(request, response) {
  response.setHeader("Pragma", "no-cache");
  response.setHeader("Cache-Control", "private, max-age=0, no-store, s-maxage=0");
  
  const rootdir = conf().get("rootdir");
  
  let path = get_abs_path(rootdir);
  path = join(path, request.url === "/" ? "index.html" : request.url);

  // if 404, rewrite to index.html
  if (!existsSync(path)) path = join(get_abs_path(rootdir), "index.html"); 

  if (existsSync(path)) {
  	const buff = readFileSync(path);
  	response.statusCode = 200;
  	response.setHeader("Content-Type", mimeTypeOf(path));
  	response.end(buff);
  } else {
  	response.statusCode = 404;
  	response.setHeader("Content-Type", "application/json");
  	response.end(res_construct(false, "index.html does not exists."));
  }
}
