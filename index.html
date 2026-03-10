import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


/* SIGNUP */

const signupForm = document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await createUserWithEmailAndPassword(auth,email,password);

alert("Signup success");

location.href="home.html";

}catch(err){

alert(err.message);

}

});

}


/* LOGIN */

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

try{

await signInWithEmailAndPassword(auth,email,password);

alert("Login success");

location.href="home.html";

}catch(err){

alert(err.message);

}

});

}


/* LOGOUT */

window.logoutUser = function(){

signOut(auth).then(()=>{

location.href="login.html";

});

}


/* SESSION CHECK */

onAuthStateChanged(auth,(user)=>{

if(!user){

const protectedPages=[
"home.html",
"upload.html",
"profile.html",
"notifications.html",
"chat.html"
];

const path=location.pathname;

protectedPages.forEach(p=>{

if(path.includes(p)){

location.href="login.html";

}

});

}

});
