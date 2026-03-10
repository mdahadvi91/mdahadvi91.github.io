import { auth, db, logout } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const username = document.getElementById("username");
const userVideos = document.getElementById("userVideos");

const videoCount = document.getElementById("videoCount");
const likes = document.getElementById("likes");
const followers = document.getElementById("followers");

const logoutBtn = document.getElementById("logoutBtn");


// LOAD PROFILE
auth.onAuthStateChanged(async(user)=>{

if(!user) return;

username.innerText = user.email;

const q = query(
collection(db,"videos"),
where("userId","==",user.uid)
);

const snapshot = await getDocs(q);

let videos = 0;
let totalLikes = 0;

userVideos.innerHTML = "";

snapshot.forEach((doc)=>{

const data = doc.data();

videos++;

totalLikes += data.likes || 0;

const video = document.createElement("video");

video.src = data.video;

video.controls = true;

video.style.width = "100%";

video.style.height = "140px";

video.style.objectFit = "cover";

userVideos.appendChild(video);

});

videoCount.innerText = videos;

likes.innerText = totalLikes;

followers.innerText = "0";

});


// LOGOUT
logoutBtn.onclick = function(){

logout();

};
