import { storage, db, auth } from "./firebase.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const fileInput = document.getElementById("videoFile");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");

uploadBtn.onclick = async ()=>{

const file = fileInput.files[0];

if(!file){

alert("Select video first");
return;

}

const user = auth.currentUser;

if(!user){

alert("Login first");
return;

}

try{

status.innerText="Uploading...";

const storageRef = ref(storage,"videos/"+Date.now()+"_"+file.name);

await uploadBytes(storageRef,file);

const url = await getDownloadURL(storageRef);

await addDoc(collection(db,"videos"),{

url:url,
userId:user.uid,
userEmail:user.email,
createdAt:serverTimestamp()

});

status.innerText="Upload success";

fileInput.value="";

}catch(err){

alert(err.message);

}

}
