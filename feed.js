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
video.playsInline = true;
video.autoplay = true;

feed.appendChild(video);

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

videos.forEach((video)=>{
observer.observe(video);
});

}
