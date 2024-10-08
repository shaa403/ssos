

export default function body_parser(request, response, next) {
  let payload = "";
  request.setEncoding("utf-8");
  request.on("data", (chunk)=> {
   	payload += chunk;
  });
  request.on("end", async ()=> {
    try { payload = JSON.parse(payload) } 
    catch(_) { payload = {} }
    request.body = payload;
    next(request, response);
  });
}
