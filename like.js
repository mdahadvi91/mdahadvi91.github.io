import { db } from "./firebase.js";
import {
doc,
getDoc,
updateDoc,
setDoc,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

let liked = false;
let currentVideoId = "default";

async function loadLikes(){

try{

const ref = doc(db,"likes",currentVideoId);

const snap = await getDoc(ref);

if(snap.exists()){

likeCount.innerText = snap.data().count || 0;

}else{

await setDoc(ref,{count:0});

likeCount.innerText = 0;

}

}catch(e){

console.log("Like load error:",e);

}

}

async function toggleLike(){

try{

const ref = doc(db,"likes",currentVideoId);

if(!liked){

await updateDoc(ref,{
count:increment(1)
});

liked = true;

}else{

await updateDoc(ref,{
count:increment(-1)
});

liked = false;

}

loadLikes();

}catch(e){

console.log("Like error:",e);

}

}

if(likeBtn){

likeBtn.onclick = toggleLike;

}

loadLikes();


// DOUBLE TAP LIKE SUPPORT

const feed = document.getElementById("video-feed");

if(feed){

feed.addEventListener("dblclick",(e)=>{

if(e.target.tagName==="VIDEO"){

toggleLike();

}

});

}


// LIKE ANIMATION

function showLikeAnimation(){

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";
heart.style.left="50%";
heart.style.top="50%";
heart.style.fontSize="70px";
heart.style.transform="translate(-50%,-50%)";
heart.style.pointerEvents="none";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},800);

}

feed?.addEventListener("dblclick",(e)=>{

if(e.target.tagName==="VIDEO"){

showLikeAnimation();

}

});


// LOCAL LIKE SAVE

function saveLocalLike(){

localStorage.setItem("likedVideo",liked);

}

function loadLocalLike(){

const saved = localStorage.getItem("likedVideo");

if(saved){

liked = saved==="true";

}

}

loadLocalLike();

likeBtn?.addEventListener("click",saveLocalLike);
