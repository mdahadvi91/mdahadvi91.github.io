import { auth, db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const followBtn = document.getElementById("followBtn");

let currentCreator = null;


// SET VIDEO CREATOR
function setCreator(userId){

currentCreator = userId;

}

window.setCreator = setCreator;


// FOLLOW BUTTON
followBtn.onclick = async function(){

const user = auth.currentUser;

if(!user || !currentCreator) return;

await addDoc(collection(db,"follows"),{

follower: user.uid,
following: currentCreator,
time: Date.now()

});

alert("Followed");

};
