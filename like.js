import { db } from "./firebase.js";
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const likeBtn = document.getElementById("likeBtn");

let currentVideoId = null;

/* feed.js থেকে video id set হবে */
export function setVideoId(id){
  currentVideoId = id;
}

likeBtn.addEventListener("click", async ()=>{

if(!currentVideoId) return;

const videoRef = doc(db,"videos",currentVideoId);

await updateDoc(videoRef,{
likes: increment(1)
});

});
