import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
updateDoc,
doc
}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


const firebaseConfig = {

apiKey: "AIzaSyDAl3TMOxgMKvw-hjqmhEyNTUj2_I25bgk",
authDomain: "hridoy-er-apps-2ad7c.firebaseapp.com",
projectId: "hridoy-er-apps-2ad7c",
storageBucket: "hridoy-er-apps-2ad7c.firebasestorage.app",
messagingSenderId: "152919903520",
appId: "1:152919903520:web:5726d95dceeab535961b45"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);


/* PAGE SWITCH */

window.showPage=function(id){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById(id).classList.add("active")

}


/* LOAD VIDEOS */

async function loadVideos(){

const feed=document.getElementById("video-feed")

feed.innerHTML=""

const snap=await getDocs(collection(db,"videos"))

snap.forEach(d=>{

const data=d.data()

const box=document.createElement("div")

box.className="video-box"

box.innerHTML=`

<video src="${data.url}" loop controls></video>

<div class="right-buttons">

<button onclick="likeVideo('${d.id}',this)">❤️</button>

<div>${data.likes||0}</div>

<button onclick="shareVideo()">🔗</button>

<div>👁 ${data.views||0}</div>

</div>

`

feed.appendChild(box)

})

}

loadVideos()


/* UPLOAD */

window.uploadVideo=async function(){

const file=document.getElementById("videoFile").files[0]

if(!file){

alert("Select video")

return

}

const fileName=Date.now()+"_"+file.name

const storageRef=ref(storage,"videos/"+fileName)

await uploadBytes(storageRef,file)

const url=await getDownloadURL(storageRef)

await addDoc(collection(db,"videos"),{

url:url,
likes:0,
views:0

})

alert("Video Uploaded")

loadVideos()

}


/* LIKE */

window.likeVideo=async function(id,btn){

const likeText=btn.nextElementSibling

let count=parseInt(likeText.innerText)

count++

likeText.innerText=count

await updateDoc(doc(db,"videos",id),{

likes:count

})

}


/* SHARE */

window.shareVideo=function(){

navigator.clipboard.writeText(location.href)

alert("Link Copied")

}
