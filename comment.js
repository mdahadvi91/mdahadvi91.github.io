import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const commentBtn = document.getElementById("commentBtn");

commentBtn.addEventListener("click", ()=>{

const comment = prompt("Write your comment");

if(!comment) return;

addDoc(collection(db,"comments"),{
text: comment,
time: Date.now()
});

alert("Comment added");

});
