import { db } from "./firebase.js";
import {
doc,
getDoc,
setDoc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const followBtn = document.getElementById("followBtn");

let following = false;
let creatorId = "defaultCreator";

async function loadFollow(){

try{

const ref = doc(db,"follows",creatorId);

const snap = await getDoc(ref);

if(!snap.exists()){

await setDoc(ref,{count:0});

}

}catch(e){

console.log("Follow load error:",e);

}

}

async function toggleFollow(){

try{

const ref = doc(db,"follows",creatorId);

if(!following){

await updateDoc(ref,{
count:increment(1)
});

followBtn.innerText="✓";
following=true;

}else{

await updateDoc(ref,{
count:increment(-1)
});

followBtn.innerText="➕";
following=false;

}

saveFollowLocal();

}catch(e){

console.log("Follow error:",e);

}

}

function saveFollowLocal(){

localStorage.setItem("followState",following);

}

function loadFollowLocal(){

const saved=localStorage.getItem("followState");

if(saved){

following = saved==="true";

if(following){
followBtn.innerText="✓";
}

}

}

if(followBtn){

followBtn.onclick=toggleFollow;

}

loadFollow();
loadFollowLocal();


// FOLLOW NOTIFICATION SYSTEM

function sendFollowNotification(){

console.log("New follower added");

}

followBtn?.addEventListener("click",sendFollowNotification);


// CREATOR ANALYTICS

let followClicks=0;

followBtn?.addEventListener("click",()=>{

followClicks++;

console.log("Follow clicks:",followClicks);

});


// FOLLOW ANIMATION

function followAnimation(){

const star=document.createElement("div");

star.innerHTML="⭐";

star.style.position="fixed";
star.style.left="50%";
star.style.top="40%";
star.style.fontSize="50px";
star.style.transform="translate(-50%,-50%)";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},700);

}

followBtn?.addEventListener("click",followAnimation);
