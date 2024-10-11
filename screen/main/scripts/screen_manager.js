

document.querySelector("#menu-bar-time").innerHTML = getTime();

function getTime() {
  const date = new Date();
  const hh = date.getHours();
  return `${hh < 10 ? '0'+ hh : hh}:${date.getMinutes()}`;		
}
 
setInterval(()=> {
  document.querySelector("#menu-bar-time").innerHTML = getTime();
},1000 * 30);
  /* Not up to 60s "on purpose" to sync since the amount of seconds left till "new time" depends on the 
  time at which this script started execution */
