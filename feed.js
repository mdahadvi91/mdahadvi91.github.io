import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML="Loading videos...";

try{

const snapshot = await getDocs(collection(db,"videos2"));

console.log("Videos found:",snapshot.size);

feed.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

console.log(data);

const video = document.createElement("video");

video.src = data.video;
video.muted = true;
video.loop = true;
video.autoplay = true;
video.controls = true;

video.style.width="100%";
video.style.height="100vh";

feed.appendChild(video);

});

}catch(err){

console.error(err);
feed.innerHTML="Error loading videos";

}

}

loadVideos();
