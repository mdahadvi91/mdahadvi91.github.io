import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML="";

const q = query(collection(db,"videos"),orderBy("time","desc"));

const snapshot = await getDocs(q);

snapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;

video.controls = true;

video.autoplay = true;

video.loop = true;

video.muted = false;

video.style.width="100%";

feed.appendChild(video);

});

}

loadVideos();
