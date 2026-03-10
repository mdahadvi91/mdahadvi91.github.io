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
video.muted = true;
video.autoplay = true;
video.playsInline = true;

feed.appendChild(video);

/* 🔊 TAP SOUND CONTROL */

video.addEventListener("click",()=>{

video.muted = !video.muted;

});

/* ❤️ DOUBLE TAP LIKE */

video.addEventListener("dblclick",(e)=>{

const heart = document.createElement("div");

heart.innerHTML = "❤️";

heart.className = "heart";

heart.style.left = e.clientX + "px";
heart.style.top = e.clientY + "px";

document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},1000);

});

});

startObserver();

}

loadVideos();


function startObserver(){

const videos = document.querySelectorAll(".feed-video");

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

const video = entry.target;

if(entry.isIntersecting){

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
