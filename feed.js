import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML="";

const snapshot = await getDocs(collection(db,"videos"));

snapshot.forEach((doc)=>{

const data = doc.data();

if(!data.video) return;

const video = document.createElement("video");

video.src = data.video;

video.className="feed-video";

video.loop=true;
video.muted=false;
video.playsInline=true;

feed.appendChild(video);

});

startObserver();

}

function startObserver(){

const videos=document.querySelectorAll(".feed-video");

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

const video=entry.target;

if(entry.isIntersecting){

// pause all videos
videos.forEach(v=>{
v.pause();
});

// play only current
video.play();

}else{

video.pause();

}

});

},{threshold:0.7});

videos.forEach(video=>{
observer.observe(video);
});

}

loadVideos();
