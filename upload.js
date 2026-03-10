import { storage, db } from "./firebase.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const videoInput = document.getElementById("videoFile");
const uploadBtn = document.getElementById("uploadVideoBtn");
const progressText = document.getElementById("uploadStatus");


uploadBtn?.addEventListener("click", uploadVideo);


async function uploadVideo(){

const file = videoInput.files[0];

if(!file){
alert("Select a video first");
return;
}

progressText.innerText="Uploading...";

try{

// CREATE STORAGE PATH

const videoRef = ref(storage,"videos/"+Date.now()+"_"+file.name);

// UPLOAD

await uploadBytes(videoRef,file);

// GET VIDEO URL

const url = await getDownloadURL(videoRef);

// SAVE TO FIRESTORE

await addDoc(collection(db,"videos"),{
video:url,
time:Date.now(),
likes:0,
comments:0,
views:0
});

progressText.innerText="Upload complete";

alert("Video uploaded successfully");

videoInput.value="";

}catch(error){

console.log("Upload error:",error);

progressText.innerText="Upload failed";

}

}



// DRAG DROP UPLOAD

const dropArea=document.getElementById("uploadArea");

if(dropArea){

dropArea.addEventListener("dragover",(e)=>{
e.preventDefault();
});

dropArea.addEventListener("drop",(e)=>{

e.preventDefault();

const file=e.dataTransfer.files[0];

videoInput.files=e.dataTransfer.files;

});

}



// BASIC UPLOAD ANALYTICS

let uploadCount=0;

uploadBtn?.addEventListener("click",()=>{

uploadCount++;

console.log("Total uploads:",uploadCount);

});



// FILE SIZE LIMIT

videoInput?.addEventListener("change",()=>{

const file=videoInput.files[0];

if(file && file.size>200000000){

alert("Video must be under 200MB");

videoInput.value="";

}

});
