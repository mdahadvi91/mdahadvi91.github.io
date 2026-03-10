import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const actionBtn = document.getElementById("actionBtn");
const switchBtn = document.getElementById("switchBtn");
const title = document.getElementById("title");

let isLogin = true;

/* SWITCH LOGIN / SIGNUP */

if(switchBtn){

switchBtn.onclick = ()=>{

isLogin = !isLogin;

if(isLogin){

title.innerText="Login";
actionBtn.innerText="Login";
switchBtn.innerText="Create new account";

}else{

title.innerText="Signup";
actionBtn.innerText="Signup";
switchBtn.innerText="Already have account";

}

}

}

/* LOGIN / SIGNUP ACTION */

if(actionBtn){

actionBtn.onclick = async ()=>{

const email = emailInput.value;
const password = passwordInput.value;

try{

if(isLogin){

await signInWithEmailAndPassword(auth,email,password);

}else{

await createUserWithEmailAndPassword(auth,email,password);

}

window.location.href="index.html";

}catch(err){

alert(err.message);

}

}

}

/* CHECK LOGIN STATE */

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged in:",user.email);

}else{

console.log("No user");

}

});

/* LOGOUT BUTTON */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = async ()=>{

await signOut(auth);

window.location.href="auth.html";

}

}
