import { db, auth } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const premiumBtn = document.getElementById("premiumBtn");
const boostBtn = document.getElementById("boostBtn");


// BUY PREMIUM
premiumBtn.onclick = async function(){

const user = auth.currentUser;

if(!user) return;

await addDoc(collection(db,"premiumUsers"),{

userId:user.uid,
type:"premium",
time:Date.now()

});

alert("Premium activated 💎");

};



// BOOST VIDEO
window.boostVideo = async function(videoId){

const user = auth.currentUser;

if(!user) return;

await addDoc(collection(db,"boosts"),{

videoId:videoId,
userId:user.uid,
time:Date.now()

});

alert("Video boosted 🚀");

};
