import { auth, db } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const username = document.getElementById("username");
const videoGrid = document.getElementById("userVideos");
const videoCount = document.getElementById("videoCount");

auth.onAuthStateChanged(async (user)=>{

if(!user){

window.location.href="auth.html";
return;

}

username.innerText = user.email;

loadVideos(user.uid);

});

async function loadVideos(uid){

const q = query(
collection(db,"videos"),
where("uid","==",uid)
);

const snapshot = await getDocs(q);

videoGrid.innerHTML="";

videoCount.innerText = snapshot.size;

snapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;
video.controls = true;

videoGrid.appendChild(video);

});

}

document.getElementById("logoutBtn").onclick = function(){

signOut(auth).then(()=>{
window.location.href="auth.html";
});

};
