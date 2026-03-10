import { db } from "./firebase.js";
import {
collection,
getDocs,
doc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

feed.innerHTML="";

const querySnapshot = await getDocs(collection(db,"videos"));

querySnapshot.forEach((d)=>{

const data = d.data();

const container = document.createElement("div");
container.className="video-container";

const video = document.createElement("video");

video.src = data.video;
video.loop = true;
video.playsInline = true;
video.controls = false;

video.style.width="100%";
video.style.height="100vh";
video.style.objectFit="cover";

const views = document.createElement("div");
views.className="views";
views.innerText = "👁 " + (data.views || 0);

container.appendChild(video);
container.appendChild(views);

feed.appendChild(container);

video.addEventListener("play",async ()=>{

await updateDoc(doc(db,"videos",d.id),{
views: increment(1)
});

});

});

autoPlay();

}

function autoPlay(){

const videos=document.querySelectorAll("video");

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.play();

}else{

entry.target.pause();

}

});

},{threshold:0.7});

videos.forEach(v=>{
observer.observe(v);
});

}

loadVideos();
