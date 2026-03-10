import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const giftBtn = document.getElementById("giftBtn");
const giftBox = document.getElementById("giftBox");

let coins = 100; // demo coins


// SHOW GIFT BOX

function openGiftBox(){

if(!giftBox) return;

giftBox.style.display="block";

giftBox.innerHTML = `

<div class="gift-item" data-coins="10">🌹 10</div>
<div class="gift-item" data-coins="25">🎁 25</div>
<div class="gift-item" data-coins="50">💎 50</div>
<div class="gift-item" data-coins="100">👑 100</div>

`;

document.querySelectorAll(".gift-item").forEach(item=>{

item.onclick=sendGift;

});

}


giftBtn?.addEventListener("click",openGiftBox);


// SEND GIFT

async function sendGift(e){

const cost = Number(e.target.dataset.coins);

if(coins < cost){

alert("Not enough coins");

return;

}

coins -= cost;

try{

await addDoc(collection(db,"gifts"),{
gift:e.target.innerText,
coins:cost,
time:Date.now()
});

showGiftAnimation(e.target.innerText);

}catch(err){

console.log("Gift error:",err);

}

}


// GIFT ANIMATION

function showGiftAnimation(text){

const div=document.createElement("div");

div.innerText=text;

div.style.position="fixed";
div.style.left="50%";
div.style.top="50%";
div.style.fontSize="40px";
div.style.transform="translate(-50%,-50%)";

document.body.appendChild(div);

setTimeout(()=>{
div.remove();
},1000);

}


// LOAD GIFT HISTORY

async function loadGifts(){

if(!giftBox) return;

try{

const snap = await getDocs(collection(db,"gifts"));

snap.forEach(doc=>{

console.log("Gift:",doc.data());

});

}catch(e){

console.log("Gift load error:",e);

}

}

loadGifts();


// LOCAL COINS SAVE

function saveCoins(){

localStorage.setItem("userCoins",coins);

}

function loadCoins(){

const saved = localStorage.getItem("userCoins");

if(saved){

coins = Number(saved);

}

}

giftBtn?.addEventListener("click",saveCoins);

loadCoins();


// GIFT ANALYTICS

let giftCount=0;

document.addEventListener("giftSent",()=>{

giftCount++;

console.log("Total gifts:",giftCount);

});
