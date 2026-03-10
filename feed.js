import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

/* LOAD VIDEOS */

async function loadVideos(){

feed.innerHTML="";

const querySnapshot = await getDocs(collection(db,"videos"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.url;

video.controls = true;

video.autoplay = true;

video.loop = true;

video.muted = false;

feed.appendChild(video);

});

}

loadVideos();
