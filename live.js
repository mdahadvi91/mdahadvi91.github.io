import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const liveContainer = document.getElementById("liveContainer");
const startBtn = document.getElementById("startLive");
const endBtn = document.getElementById("endLive");

let stream = null;


// START LIVE

async function startLive(){

try{

stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

const video = document.createElement("video");

video.srcObject = stream;
video.autoplay = true;
video.muted = true;

liveContainer.innerHTML="";
liveContainer.appendChild(video);


// SAVE LIVE STATUS

await addDoc(collection(db,"live"),{
status:"live",
time:Date.now()
});

}catch(e){

console.log("Live error:",e);

}

}


// END LIVE

function endLive(){

if(!stream) return;

stream.getTracks().forEach(track=>{

track.stop();

});

liveContainer.innerHTML="Live ended";

}


// BUTTON EVENTS

startBtn?.addEventListener("click",startLive);

endBtn?.addEventListener("click",endLive);


// VIEWER COUNTER

let viewers = 0;

function joinViewer(){

viewers++;

console.log("Live viewers:",viewers);

}

document.addEventListener("viewerJoin",joinViewer);


// LIVE CHAT SIMULATION

const liveChatBox = document.getElementById("liveChat");

function addLiveChat(msg){

if(!liveChatBox) return;

const div=document.createElement("div");

div.innerText=msg;

liveChatBox.appendChild(div);

}

document.addEventListener("liveMessage",(e)=>{

addLiveChat(e.detail);

});


// AUTO CLEAR CHAT

setInterval(()=>{

if(liveChatBox){
liveChatBox.innerHTML="";
}

},60000);
