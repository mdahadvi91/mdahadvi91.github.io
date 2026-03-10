import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const searchInput = document.getElementById("searchInput");
const resultBox = document.getElementById("searchResults");

let videos = [];

async function loadVideos(){

try{

const snap = await getDocs(collection(db,"videos"));

snap.forEach(doc=>{
videos.push(doc.data());
});

}catch(e){

console.log("Search load error:",e);

}

}

loadVideos();

function searchVideo(){

const text = searchInput.value.toLowerCase();

resultBox.innerHTML="";

videos.forEach(v=>{

if(v.video.toLowerCase().includes(text)){

const video=document.createElement("video");

video.src=v.video;
video.controls=true;

resultBox.appendChild(video);

}

});

}

searchInput?.addEventListener("input",searchVideo);


// TREND SEARCH COUNTER

let searchCount=0;

searchInput?.addEventListener("input",()=>{

searchCount++;

console.log("Search count:",searchCount);

});


// RECENT SEARCH SAVE

function saveSearch(text){

let list = JSON.parse(localStorage.getItem("recentSearch")||"[]");

list.push(text);

localStorage.setItem("recentSearch",JSON.stringify(list));

}

searchInput?.addEventListener("change",(e)=>{

saveSearch(e.target.value);

});
