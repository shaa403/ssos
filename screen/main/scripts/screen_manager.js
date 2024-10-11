

document.querySelector("#menu-bar-time").innerHTML = getTime();
getBatteryStats();

function getTime() {
  const date = new Date();
  const hh = date.getHours();
  const mm = date.getMinutes()
  return `${hh < 10 ? '0'+ hh : hh}:${mm < 10 ? '0'+ mm : mm}`;		
}
function getBatteryStats() {
  fetch(window.location.origin, {
  	 method: "POST",
  	 headers: {
  	 	"x-call-type": "ng"
  	 }, 
  	 body: JSON.stringify({ call: "GET_BATTERY_STATUS" })
  }).then(data => {
     return data.json()
  }).then(data => {
     if (data.ack === true) {
        if(data.data.ischarging) document.querySelector("#menu-bar-battery-charing").style.display = "block";
        else document.querySelector("#menu-bar-battery-charing").style.display = "none";
        document.querySelector("#menu-bar-battery-percentage").innerHTML = data.data.lvl * 100 +'%';
     }
  })	
}
 
setInterval(()=> {
  document.querySelector("#menu-bar-time").innerHTML = getTime();
  getBatteryStats();
},1000 * 10);
