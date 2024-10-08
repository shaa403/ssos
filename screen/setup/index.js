

const welcome_message = document.querySelector("#welcome-message");
const storage_options = document.querySelector("#storage-options");
const user_agreement = document.querySelector("#user-agreement");
const create_user = document.querySelector("#create-user");
const restarting = document.querySelector("#restarting");

function hideView(int) {
  if (int === "1") {
    welcome_message.classList.remove("show-prompt-container");
    welcome_message.classList.add("hide-prompt-container");
    storage_options.classList.remove("hide-prompt-container");
    storage_options.classList.add("show-prompt-container");
  }
  if (int === "2") {
    storage_options.classList.remove("show-prompt-container");
    storage_options.classList.add("hide-prompt-container");
    user_agreement.classList.remove("hide-prompt-container");
    user_agreement.classList.add("show-prompt-container");
  }
  if (int === "3") {
    user_agreement.classList.remove("show-prompt-container");
    user_agreement.classList.add("hide-prompt-container");
    create_user.classList.remove("hide-prompt-container");
    create_user.classList.add("show-prompt-container");
  }
}

const username = document.querySelector("#username");
const password = document.querySelector("#password");	

function userInputValidated() {
  if (
    username.value && password.value &&
    username.value.length <= 20 && password.value.length <= 20 &&
    username.value.length >= 2 && password.value.length >= 6 
  ) return true;
  else return false;
}
function watchinput() {
  const btn = document.querySelector("#submit-btn");
  if (userInputValidated()) {
  	 btn.style.cursor = "pointer";
  	 btn.style.opacity = 1;
  } else {
  	 btn.style.cursor = "none";
  	 btn.style.opacity = 0.4;  	
  }
} 
let locked = false;
function submit() {
  if (userInputValidated() && !locked) {
     locked = true;
     let callCode = 0;
     fetch(window.location.origin, {
        method: "POST",
     	headers: {
     	  "x-call-type": "ng"
     	},
     	body: JSON.stringify({
     	   call: "_SETUP",
     	   username: username.value,
     	   password: password.value	
     	})
     }).then(data => {
        callCode = data.status;
     	return data.text();
     }).then(data => {
        console.log(callCode, data);
     }).catch(error => {
       console.log(error);	
     });
  	   	// create_user.classList.remove("show-prompt-container");
     	// create_user.classList.add("hide-prompt-container");
        // restarting.classList.remove("hide-prompt-container");
        // restarting.classList.add("show-prompt-container");
// 
        // const timeout_view = document.querySelector("#timeout");
        // let timeout = 4;
        // setInterval(()=> {
          // if (timeout === 0) {
          	// window.location.reload();
          // } else {
            // timeout_view.innerHTML = timeout;
            // --timeout;
          // }
        // }, 1000);
  }
}
