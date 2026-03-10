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
video.className="feed-video";

video.autoplay=true;
video.loop=true;
video.muted=true;
video.playsInline=true;

feed.appendChild(video);

});

}

loadVideos();
