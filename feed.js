import { db } from "./firebase.js";
import {
collection,
getDocs,
query,
orderBy,
limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos(){

try{

const q = query(
collection(db,"videos"),
orderBy("time","desc"),
limit(50)
);

const snapshot = await getDocs(q);

if(snapshot.empty){

// DEFAULT VIDEO IF DATABASE EMPTY

const video = document.createElement("video");
video.src="https://www.w3schools.com/html/mov_bbb.mp4";
video.controls=true;
video.autoplay=true;
video.loop=true;
video.muted=true;

feed.appendChild(video);

return;

}

snapshot.forEach((doc)=>{

const data = doc.data();

const video = document.createElement("video");

video.src = data.video;
video.controls = true;
video.autoplay = true;
video.loop = true;
video.muted = true;
video.playsInline = true;

feed.appendChild(video);

});

}catch(error){

console.log("Feed error:",error);

}

}

loadVideos();


// AUTO PLAY SYSTEM

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

const video = entry.target;

if(entry.isIntersecting){

video.play();

}else{

video.pause();

}

});

},{ threshold:0.6 });

function observeVideos(){

const videos=document.querySelectorAll("video");

videos.forEach(v=>{
observer.observe(v);
});

}

setTimeout(observeVideos,1000);


// DOUBLE TAP LIKE

feed.addEventListener("dblclick",(e)=>{

if(e.target.tagName==="VIDEO"){

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="absolute";
heart.style.fontSize="60px";
heart.style.left="50%";
heart.style.top="50%";
heart.style.transform="translate(-50%,-50%)";
heart.style.pointerEvents="none";

document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},800);

}

});


// SHARE FEATURE

const shareBtn=document.getElementById("shareBtn");

if(shareBtn){

shareBtn.onclick=()=>{

navigator.clipboard.writeText(window.location.href);

alert("Video link copied");

};

}


// SCROLL MEMORY

let lastScroll=0;

feed.addEventListener("scroll",()=>{

lastScroll=feed.scrollTop;

localStorage.setItem("scroll",lastScroll);

});

window.onload=()=>{

const saved=localStorage.getItem("scroll");

if(saved){

feed.scrollTop=saved;

}

};


// BASIC ANALYTICS

let viewCount=0;

feed.addEventListener("play",(e)=>{

if(e.target.tagName==="VIDEO"){

viewCount++;

console.log("Views:",viewCount);

}

},true);
