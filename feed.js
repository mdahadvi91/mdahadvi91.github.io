import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

const snapshot = await getDocs(collection(db,"videos2"));

snapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;
video.muted = true;
video.loop = true;
video.autoplay = true;
video.playsInline = true;
video.controls = true;

feed.appendChild(video);

});

}

loadVideos();
