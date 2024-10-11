

document.querySelector("#menu-bar-time").innerHTML = getTime();
getBatteryStats();
getNetStats();

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
function getNetStats() {
  fetch(window.location.origin, {
  	 method: "POST",
  	 headers: {
  	 	"x-call-type": "ng"
  	 }, 
  	 body: JSON.stringify({ call: "GET_NET_STATUS" })
  }).then(data => {
     return data.json()
  }).then(data => {
     if (data.ack === true) {
        if(data.data) {
           document.querySelector("#menu-bar-net-connected").style.display = "block";
           document.querySelector("#menu-bar-net-disconnected").style.display = "none";
        } else {
           document.querySelector("#menu-bar-net-connected").style.display = "none";
           document.querySelector("#menu-bar-net-disconnected").style.display = "block";        	
        }
     }
  })	
}
 
setInterval(()=> {
  document.querySelector("#menu-bar-time").innerHTML = getTime();
  getBatteryStats();
  getNetStats();
},1000 * 5);
