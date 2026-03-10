import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

const querySnapshot = await getDocs(collection(db,"videos"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;

video.muted = true;
video.loop = true;
video.playsInline = true;

video.setAttribute("class","feed-video");

feed.appendChild(video);

});

autoPlayVideos();

}

loadVideos();


function autoPlayVideos(){

const videos = document.querySelectorAll(".feed-video");

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.play();

}else{

entry.target.pause();

}

});

},{ threshold:0.8 });


videos.forEach((video)=>{

observer.observe(video);

});

}
