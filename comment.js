import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const commentBtn = document.getElementById("commentBtn");
const commentBox = document.getElementById("commentBox");

commentBtn.onclick = async ()=>{

const text = prompt("Write comment");

if(!text) return;

await addDoc(collection(db,"comments"),{
text:text,
time:Date.now()
});

loadComments();
};

async function loadComments(){

commentBox.innerHTML="";

const snap = await getDocs(collection(db,"comments"));

snap.forEach(d=>{
const div = document.createElement("div");
div.innerText = d.data().text;
commentBox.appendChild(div);
});

}

loadComments();
