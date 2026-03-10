import { storage, db, auth } from "./firebase.js";

import {
ref,
uploadBytesResumable,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const fileInput = document.getElementById("videoFile");
const preview = document.getElementById("preview");
const uploadBtn = document.getElementById("uploadBtn");
const progress = document.getElementById("progress");

const musicSelect = document.getElementById("musicSelect");
const musicPreview = document.getElementById("musicPreview");

const effectSelect = document.getElementById("effectSelect");

const startTrim = document.getElementById("startTrim");
const endTrim = document.getElementById("endTrim");

let selectedFile = null;



// VIDEO PREVIEW
fileInput.onchange = function(){

selectedFile = fileInput.files[0];

if(!selectedFile) return;

preview.src = URL.createObjectURL(selectedFile);

};



// MUSIC PREVIEW
musicSelect.onchange = function(){

musicPreview.src = musicSelect.value;

};



// EFFECT PREVIEW
effectSelect.onchange = function(){

preview.style.filter = effectSelect.value;

};



// TRIM LOOP
preview.ontimeupdate = function(){

if(endTrim.value > 0){

if(preview.currentTime > endTrim.value){

preview.currentTime = startTrim.value;

}

}

};



// UPLOAD VIDEO
uploadBtn.onclick = function(){

if(!selectedFile){

alert("Select video first");

return;

}

const fileName = Date.now() + "_" + selectedFile.name;

const storageRef = ref(storage,"videos/"+fileName);

const uploadTask = uploadBytesResumable(storageRef,selectedFile);



uploadTask.on("state_changed",

(snapshot)=>{

const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

progress.innerText = "Upload: " + Math.floor(percent) + "%";

},



(error)=>{

alert("Upload error");

},



async ()=>{

const url = await getDownloadURL(uploadTask.snapshot.ref);



await addDoc(collection(db,"videos"),{

video:url,
userId:auth.currentUser.uid,
likes:0,
views:0,
time:Date.now()

});



alert("Upload complete");

window.location.href="index.html";

}

);

};
