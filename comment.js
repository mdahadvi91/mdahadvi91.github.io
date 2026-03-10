import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const commentBtn = document.getElementById("commentBtn");
const commentBox = document.getElementById("commentBox");

let currentVideoId = null;


// SET CURRENT VIDEO
function setCommentVideo(id){

currentVideoId = id;

loadComments();

}

window.setCommentVideo = setCommentVideo;


// ADD COMMENT
commentBtn.onclick = async function(){

if(!currentVideoId) return;

const text = prompt("Write comment");

if(!text) return;

await addDoc(collection(db,"comments"),{

videoId: currentVideoId,
text: text,
time: Date.now()

});

};


// LOAD COMMENTS
function loadComments(){

const q = query(
collection(db,"comments"),
orderBy("time","desc")
);

onSnapshot(q,(snapshot)=>{

commentBox.innerHTML = "";

snapshot.forEach((doc)=>{

const data = doc.data();

if(data.videoId !== currentVideoId) return;

const div = document.createElement("div");

div.innerText = data.text;

commentBox.appendChild(div);

});

});

}
