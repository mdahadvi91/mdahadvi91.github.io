import { db, auth } from "./firebase.js";

import {
doc,
setDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const likeBtn = document.getElementById("likeBtn");

let liked = false;

if(likeBtn){

likeBtn.onclick = async ()=>{

const user = auth.currentUser;

if(!user){

alert("Login first");
return;

}

const videoId = "currentVideo"; // video id placeholder

const likeRef = doc(db,"likes",user.uid+"_"+videoId);

try{

if(!liked){

await setDoc(likeRef,{
userId:user.uid,
videoId:videoId
});

likeBtn.innerText="💖";

liked=true;

}else{

await deleteDoc(likeRef);

likeBtn.innerText="❤️";

liked=false;

}

}catch(err){

alert(err.message);

}

}

}
