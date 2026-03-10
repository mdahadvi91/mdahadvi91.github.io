import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const commentBtn = document.getElementById("commentBtn");
const commentBox = document.getElementById("commentBox");
const commentInput = document.getElementById("commentInput");
const sendComment = document.getElementById("sendComment");

let videoId = "currentVideo"; // placeholder

/* OPEN COMMENT BOX */

if(commentBtn){

commentBtn.onclick = ()=>{

if(commentBox){

commentBox.style.display="block";

}

}

}

/* SEND COMMENT */

if(sendComment){

sendComment.onclick = async ()=>{

const user = auth.currentUser;

if(!user){

alert("Login first");
return;

}

const text = commentInput.value;

if(text=="") return;

try{

await addDoc(collection(db,"comments"),{

videoId:videoId,
userId:user.uid,
userEmail:user.email,
text:text,
createdAt:serverTimestamp()

});

commentInput.value="";

alert("Comment added");

}catch(err){

alert(err.message);

}

}

}
