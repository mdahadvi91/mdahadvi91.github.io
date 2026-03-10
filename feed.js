import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

const querySnapshot = await getDocs(collection(db,"videos"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;

video.className = "feed-video";

video.loop = true;
video.controls = false;
video.playsInline = true;

feed.appendChild(video);

});

observeVideos();

}

loadVideos();


function observeVideos(){

const videos = document.querySelectorAll(".feed-video");

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

const video = entry.target;

if(entry.isIntersecting){

// pause all videos first
videos.forEach(v=>{
v.pause();
v.muted = true;
});

// play current video
video.muted = false;
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
