import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const liveChat = document.getElementById("liveChat");
const liveMessage = document.getElementById("liveMessage");
const sendLive = document.getElementById("sendLive");
const giftBtn = document.getElementById("giftBtn");


// SEND LIVE MESSAGE
sendLive.onclick = async function(){

const text = liveMessage.value;

if(!text) return;

await addDoc(collection(db,"liveMessages"),{

text:text,
user:auth.currentUser.uid,
time:Date.now()

});

liveMessage.value="";

};


// LOAD LIVE CHAT
const q = query(
collection(db,"liveMessages"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

liveChat.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

const div = document.createElement("div");

div.className="live-message";

div.innerText = data.text;

liveChat.appendChild(div);

});

liveChat.scrollTop = liveChat.scrollHeight;

});


// SEND GIFT
giftBtn.onclick = async function(){

await addDoc(collection(db,"gifts"),{

from:auth.currentUser.uid,
time:Date.now(),
gift:"coin"

});

alert("Gift sent 🎁");

};
