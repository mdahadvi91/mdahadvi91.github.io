import { auth, db } from "./firebase.js";

import {
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const userEmail = document.getElementById("userEmail");
const userVideos = document.getElementById("userVideos");
const logoutBtn = document.getElementById("logoutBtn");

/* CHECK USER */

onAuthStateChanged(auth, async (user)=>{

if(!user){

window.location.href="auth.html";
return;

}

/* SHOW EMAIL */

if(userEmail){
userEmail.innerText = user.email;
}

/* LOAD USER VIDEOS */

const q = query(
collection(db,"videos"),
where("userId","==",user.uid)
);

const snapshot = await getDocs(q);

snapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.url;
video.controls = true;

userVideos.appendChild(video);

});

});

/* LOGOUT */

if(logoutBtn){

logoutBtn.onclick = async ()=>{

await signOut(auth);

window.location.href="auth.html";

}

}
