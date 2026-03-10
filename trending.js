import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy,
limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const trendingBox = document.getElementById("trendingVideos");


async function loadTrending(){

if(!trendingBox) return;

trendingBox.innerHTML="Loading trending...";

try{

const q = query(
collection(db,"videos"),
orderBy("views","desc"),
limit(20)
);

const snap = await getDocs(q);

trendingBox.innerHTML="";

if(snap.empty){

trendingBox.innerHTML="<div>No trending videos</div>";
return;

}

snap.forEach(doc=>{

const data = doc.data();

const video=document.createElement("video");

video.src=data.video;
video.controls=true;
video.loop=true;

trendingBox.appendChild(video);

});

}catch(e){

console.log("Trending error:",e);

trendingBox.innerHTML="Failed to load";

}

}


loadTrending();


// AUTO REFRESH TRENDING

setInterval(()=>{

loadTrending();

},15000);


// TREND ANALYTICS

let trendView=0;

trendingBox?.addEventListener("play",(e)=>{

if(e.target.tagName==="VIDEO"){

trendView++;

console.log("Trending views:",trendView);

}

},true);


// SIMPLE TREND SCORE SYSTEM

function calculateTrendScore(video){

let score = 0;

score += video.views || 0;
score += (video.likes || 0) * 2;
score += (video.comments || 0) * 3;

return score;

}


// LOCAL TREND CACHE

function saveTrendLocal(list){

localStorage.setItem("trendingVideos",JSON.stringify(list));

}

function loadTrendLocal(){

const data = localStorage.getItem("trendingVideos");

if(!data) return;

try{

const list = JSON.parse(data);

list.forEach(v=>{

const video=document.createElement("video");

video.src=v.video;
video.controls=true;

trendingBox?.appendChild(video);

});

}catch(e){}

}

loadTrendLocal();
