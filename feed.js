import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

const snapshot = await getDocs(collection(db,"videos"));

snapshot.forEach((doc)=>{

const data = doc.data();

if(!data.video) return;

const video = document.createElement("video");

video.src = data.video;
video.muted = true;
video.loop = true;
video.playsInline = true;
video.preload = "auto";

feed.appendChild(video);

});

autoPlay();
}

function autoPlay(){

const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

const video = entry.target;

if(entry.isIntersecting){

video.play();

}else{

video.pause();

}

});

},{ threshold:0.7 });

videos.forEach(video=>{
observer.observe(video);
});

}

loadVideos();
