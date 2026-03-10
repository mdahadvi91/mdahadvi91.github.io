import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML = "";

const snapshot = await getDocs(collection(db,"videos"));

snapshot.forEach((doc)=>{

const data = doc.data();

const wrapper = document.createElement("div");
wrapper.style.height = "100vh";
wrapper.style.scrollSnapAlign = "start";

const video = document.createElement("video");

video.src = data.video;
video.loop = true;
video.playsInline = true;
video.muted = false;
video.controls = true;

video.style.width = "100%";
video.style.height = "100vh";
video.style.objectFit = "cover";

wrapper.appendChild(video);
feed.appendChild(wrapper);

});

setupObserver();

}

loadVideos();

function setupObserver(){

const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

const video = entry.target;

if(entry.isIntersecting){

video.play().catch(()=>{});

}else{

video.pause();
video.currentTime = 0;

}

});

},{threshold:0.7});

videos.forEach(video=>{

observer.observe(video);

});

}
