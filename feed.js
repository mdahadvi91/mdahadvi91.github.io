import { db } from "./firebase.js";

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos() {

if(!feed){
console.log("video-feed div not found");
return;
}

feed.innerHTML = "";

try{

const querySnapshot = await getDocs(collection(db,"videos"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

if(!data.video) return;

const video = document.createElement("video");

video.src = data.video;
video.autoplay = true;
video.loop = true;
video.muted = false;
video.controls = true;
video.playsInline = true;

video.style.width = "100%";
video.style.height = "100vh";
video.style.objectFit = "cover";

feed.appendChild(video);

});

}catch(error){

console.log("Error loading videos:",error);

}

}

loadVideos();
