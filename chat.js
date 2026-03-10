import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");


// SEND MESSAGE
sendBtn.onclick = async function(){

const text = messageInput.value;

if(!text) return;

await addDoc(collection(db,"messages"),{

text:text,
user:auth.currentUser.uid,
time:Date.now()

});

messageInput.value="";

};



// LOAD MESSAGES
const q = query(
collection(db,"messages"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

chatBox.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

const div = document.createElement("div");

div.className="message";

div.innerText=data.text;

chatBox.appendChild(div);

});

chatBox.scrollTop = chatBox.scrollHeight;

});
