import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML = "";

try{

const snapshot = await getDocs(collection(db,"videos"));

snapshot.forEach((doc)=>{

const data = doc.data();

if(!data.video) return;

const video = document.createElement("video");

video.src = data.video;
video.controls = true;
video.autoplay = true;
video.loop = true;
video.muted = true;
video.playsInline = true;

feed.appendChild(video);

});

}catch(err){

console.log("Video load error:",err);

}

}

loadVideos();
