import { db } from "./firebase.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const premiumBtn = document.getElementById("premiumBtn");
const premiumBadge = document.getElementById("premiumBadge");

let userId = "defaultUser";
let isPremium = false;


// LOAD PREMIUM STATUS

async function loadPremium(){

try{

const ref = doc(db,"premiumUsers",userId);

const snap = await getDoc(ref);

if(snap.exists()){

isPremium = true;

showPremium();

}

}catch(e){

console.log("Premium load error:",e);

}

}


// ACTIVATE PREMIUM

async function activatePremium(){

try{

const ref = doc(db,"premiumUsers",userId);

await setDoc(ref,{
active:true,
time:Date.now()
});

isPremium = true;

showPremium();

alert("Premium activated");

}catch(e){

console.log("Premium error:",e);

}

}


// SHOW BADGE

function showPremium(){

if(premiumBadge){

premiumBadge.style.display="inline-block";

premiumBadge.innerText="⭐ PREMIUM";

}

}


// BUTTON EVENT

premiumBtn?.addEventListener("click",activatePremium);


// PREMIUM VIDEO FILTER

function filterPremiumVideos(videos){

if(!isPremium){

return videos.filter(v=>!v.premium);

}

return videos;

}


// LOCAL SAVE

function savePremiumLocal(){

localStorage.setItem("premiumUser",isPremium);

}

function loadPremiumLocal(){

const saved = localStorage.getItem("premiumUser");

if(saved){

isPremium = saved==="true";

if(isPremium){
showPremium();
}

}

}

premiumBtn?.addEventListener("click",savePremiumLocal);

loadPremium();
loadPremiumLocal();


// PREMIUM ANALYTICS

let premiumClicks=0;

premiumBtn?.addEventListener("click",()=>{

premiumClicks++;

console.log("Premium clicks:",premiumClicks);

});
