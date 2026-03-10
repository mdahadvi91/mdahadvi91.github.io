import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

const snapshot = await getDocs(collection(db,"videos"));

feed.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");
video.src = data.video;
video.className = "feed-video";

video.loop = true;
video.controls = false;
video.playsInline = true;

feed.appendChild(video);

});

setupScrollPlay();

}

function setupScrollPlay(){

const videos = document.querySelectorAll(".feed-video");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

const video = entry.target;

if(entry.isIntersecting){

videos.forEach(v => v.pause());

video.play();

}else{

video.pause();

}

});

},{threshold:0.8});

videos.forEach(v => observer.observe(v));

}

loadVideos();
