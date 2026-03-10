import { db } from "./firebase.js";
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

let currentVideoId = null;

export function setCurrentVideo(id,likes){
currentVideoId = id;
likeCount.innerText = likes || 0;
}

likeBtn.onclick = async ()=>{
if(!currentVideoId) return;

const ref = doc(db,"videos",currentVideoId);

await updateDoc(ref,{
likes: increment(1)
});

likeCount.innerText = Number(likeCount.innerText)+1;
};
