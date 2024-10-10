

const sessionID = sessionStorage.getItem("session");

console.log(sessionID);

function sign_user() {
  let user;
  let password = document.querySelector("#password");
  let _get_users_status_ = 0;  
  fetch(window.location.origin, {
      method: "POST",
      headers: {
         "x-call-type": "ng"
      },
      body: JSON.stringify({ call: "GETUSERS" })
   }).then(data => {
      if (data.status === 200) return data.json();
      throw { message: null }
   }).then(data => {
      const username_container = document.querySelector("#signin-prompt-usernames");
      const template = username => `
         <div class="signin-prompt-uselect">
           <span class="signin-prompt-text" style="font-family:'poppins_bold', sans-serif;">${username}</span>
           <span
              class="signin-prompt-text" 
              style="cursor:pointer;color:dodgerblue;font-family:'poppins_bold', sans-serif;"
              onclick="selectuser('${username}')">Select</span>
         </div>
      `;
      const users = data.data;
      users.map(user => {
   	     if (user) username_container.innerHTML += template(user);
      });
   }).catch(error => {
      // Chances of this block ever getting executed is extremely low.
      setTimeout(()=> window.location.reload(), 7000);  
   }); 
   function selectuser(username) {
     user = username;
     document.querySelector("#signin-prompt-pass-usr").innerHTML = user;
     const user_screen = document.querySelector("#user_screen");
     const password_screen = document.querySelector("#password_screen")
     user_screen.classList.remove("show-prompt-container");
     user_screen.classList.add("hide-prompt-container");
     password_screen.classList.remove("hide-prompt-container");
     password_screen.classList.add("show-prompt-container");	
   } 
   function userPasswordValidated() {
     if ( password.value && password.value.length <= 20 && password.value.length >= 6) return true;
     else return false;
   }
   let locked = false;
   function watchinput() {
     document.querySelector("#signin-prompt-alert").style.display = "none";
     const btn = document.querySelector("#signin-prompt-btn");
     if (userPasswordValidated() && !locked) {
  	    btn.style.cursor = "pointer";
  	    btn.style.opacity = 1;
     } else {
  	    btn.style.cursor = "none";
  	    btn.style.opacity = 0.4;
     }
   }
   function signin_promp_submit() {   
     if (userPasswordValidated() && !locked) {
        locked = true;
        document.querySelector("#signin-prompt-btn").style.cursor = "none";
        document.querySelector("#signin-prompt-btn").style.opacity = 0.4; 
        let callcode;
        
        fetch(window.location.origin, {
           method: "POST",
     	   headers: {
     	      "x-call-type": "ng"
     	   },
     	   body: JSON.stringify({
     	      call: "SIGNIN",
     	      user,
     	      password: password.value
     	   })
        }).then(data => {
           callcode = data.status;
           return data.json();
        }).then(data => {
           if (callcode === 200) { 
             sessionStorage.setItem("session",  data.data); 
             window.location.reload();
           } else if (callcode === 401) {        
             if (data.message === -1) { 
                const template = `
                   <span 
                      class="signin-prompt-text" style="color:tomato;font-family:'poppins',sans-serif">
                      Cannot sign you in because there is an active session of this user. 
                      Please signout of that session, or restart ssos to continue if you dont have access
                      to the tab running ssos as ${user}.
                   </span> 
                `;
                document.querySelector("#signin-prompt-btn-body").innerHTML = template;
             } else {
               document.querySelector("#signin-prompt-alert").style.display = "block";
               document.querySelector("#signin-prompt-btn").style.cursor = "pointer";
               document.querySelector("#signin-prompt-btn").style.opacity = 1; 
               locked = false;
             }  	
          }
       });
     }  
   }
}
