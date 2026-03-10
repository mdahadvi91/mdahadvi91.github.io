import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
}

from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

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



/* LOAD VIDEOS */

window.loadFeed = async function(container){

const snap = await getDocs(collection(db,"videos"));

snap.forEach(doc=>{

const data = doc.data();

const videoBox = document.createElement("div");

videoBox.className = "videoBox";

videoBox.innerHTML = `

<video src="${data.url}" class="video" loop></video>

<div class="actions">

<button onclick="likeVideo('${data.url}','${data.user}')">❤️</button>

<button onclick="location.href='comment.html?video=${data.url}'">💬</button>

</div>

`;

container.appendChild(videoBox);

});

activateSwipe();

};



/* SWIPE SYSTEM */

function activateSwipe(){

const videos = document.querySelectorAll(".video");

let index = 0;

videos[index].play();

document.addEventListener("wheel",function(e){

if(e.deltaY>0){

index++;

}else{

index--;

}

if(index<0) index=0;

if(index>=videos.length) index=videos.length-1;

videos.forEach(v=>v.pause());

videos[index].play();

videos[index].scrollIntoView({behavior:"smooth"});

});

}
