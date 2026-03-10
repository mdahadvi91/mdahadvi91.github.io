import { db } from "./firebase.js";

import {
doc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

let currentVideoId = null;


// SET CURRENT VIDEO ID
function setVideo(id,likes){

currentVideoId = id;

if(likeCount){
likeCount.innerText = likes || 0;
}

}

window.setVideo = setVideo;


// LIKE BUTTON
likeBtn.onclick = async function(){

if(!currentVideoId) return;

const ref = doc(db,"videos",currentVideoId);

await updateDoc(ref,{
likes:increment(1)
});

let count = parseInt(likeCount.innerText);

likeCount.innerText = count + 1;

};


// DOUBLE TAP LIKE
document.addEventListener("dblclick",async()=>{

if(!currentVideoId) return;

const ref = doc(db,"videos",currentVideoId);

await updateDoc(ref,{
likes:increment(1)
});

let count = parseInt(likeCount.innerText);

likeCount.innerText = count + 1;

});
