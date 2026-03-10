import { auth, db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* CHECK PREMIUM */

async function checkPremium(){

const user = auth.currentUser;

if(!user) return false;

const ref = doc(db,"premium",user.uid);

const snap = await getDoc(ref);

if(snap.exists()){

return true;

}else{

return false;

}

}

/* SHOW AD */

export async function showAd(){

const isPremium = await checkPremium();

if(isPremium){

console.log("Premium user - No ads");

return;

}

/* SIMPLE AD POPUP */

const ad = document.createElement("div");

ad.style.position="fixed";
ad.style.bottom="0";
ad.style.left="0";
ad.style.width="100%";
ad.style.background="black";
ad.style.color="white";
ad.style.padding="15px";
ad.style.textAlign="center";
ad.style.zIndex="9999";

ad.innerHTML="Advertisement - Your Ad Here";

document.body.appendChild(ad);

/* REMOVE AFTER 5s */

setTimeout(()=>{

ad.remove();

},5000);

}
