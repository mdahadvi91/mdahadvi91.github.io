import { db, auth } from "./firebase.js";

import {
doc,
setDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const followBtn = document.getElementById("followBtn");

let followed = false;

/* FOLLOW SYSTEM */

if(followBtn){

followBtn.onclick = async ()=>{

const user = auth.currentUser;

if(!user){

alert("Login first");
return;

}

const creatorId = "videoOwner"; // placeholder creator id

const followRef = doc(db,"followers",user.uid+"_"+creatorId);

try{

if(!followed){

await setDoc(followRef,{
follower:user.uid,
creator:creatorId
});

followBtn.innerText="Following";

followed=true;

}else{

await deleteDoc(followRef);

followBtn.innerText="Follow";

followed=false;

}

}catch(err){

alert(err.message);

}

}

}
