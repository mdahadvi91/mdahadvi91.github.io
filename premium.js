import { auth, db } from "./firebase.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* CHECK PREMIUM */

export async function isPremiumUser(){

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

/* ACTIVATE PREMIUM */

export async function activatePremium(){

const user = auth.currentUser;

if(!user){

alert("Login first");
return;

}

try{

const ref = doc(db,"premium",user.uid);

await setDoc(ref,{
userId:user.uid,
email:user.email,
premium:true,
date:Date.now()
});

alert("Premium activated");

}catch(err){

alert(err.message);

}

}
