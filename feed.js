import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML = "";

const snap = await getDocs(collection(db,"videos"));

snap.forEach(doc => {

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;
video.className = "feed-video";

video.autoplay = true;
video.loop = true;
video.muted = false;
video.controls = true;

feed.appendChild(video);

});

}

loadVideos();
