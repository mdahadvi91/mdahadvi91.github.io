import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

let currentVideo = null;


// LOAD VIDEOS
async function loadVideos(){

feed.innerHTML="";

const snapshot = await getDocs(collection(db,"videos"));

snapshot.forEach((document)=>{

const data = document.data();

const container = document.createElement("div");

container.style.height="100vh";

const video = document.createElement("video");

video.src = data.video;

video.loop = true;
video.controls = false;
video.muted = false;

video.style.width="100%";
video.style.height="100%";
video.style.objectFit="cover";


// VIEW COUNT
video.addEventListener("play", async ()=>{

const ref = doc(db,"videos",document.id);

await updateDoc(ref,{
views:increment(1)
});

});

container.appendChild(video);

feed.appendChild(container);

});

observeVideos();

}


// AUTO PLAY SYSTEM
function observeVideos(){

const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

const video = entry.target;

if(entry.isIntersecting){

if(currentVideo && currentVideo !== video){

currentVideo.pause();

}

video.play();

currentVideo = video;

}else{

video.pause();

}

});

},{threshold:0.7});

videos.forEach(video=>{
observer.observe(video);
});

}


// START
loadVideos();
