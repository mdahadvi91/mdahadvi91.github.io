import { db, auth } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const totalViews = document.getElementById("totalViews");
const totalLikes = document.getElementById("totalLikes");
const totalVideos = document.getElementById("totalVideos");
const earnings = document.getElementById("earnings");
const videoPerformance = document.getElementById("videoPerformance");


// LOAD DASHBOARD DATA
auth.onAuthStateChanged(async(user)=>{

if(!user) return;

const q = query(
collection(db,"videos"),
where("userId","==",user.uid)
);

const snapshot = await getDocs(q);

let views = 0;
let likes = 0;
let videos = 0;

videoPerformance.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

videos++;

views += data.views || 0;

likes += data.likes || 0;

const div = document.createElement("div");

div.className="video-item";

div.innerText =
"Views: "+(data.views||0)+" | Likes: "+(data.likes||0);

videoPerformance.appendChild(div);

});

totalViews.innerText = views;
totalLikes.innerText = likes;
totalVideos.innerText = videos;


// SIMPLE EARNING FORMULA
const money = (views * 0.002).toFixed(2);

earnings.innerText = "$"+money;

});
