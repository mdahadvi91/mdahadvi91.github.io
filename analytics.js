import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const analyticsBox = document.getElementById("analyticsBox");

let totalVideos = 0;
let totalLikes = 0;
let totalComments = 0;
let totalViews = 0;


// LOAD ANALYTICS

async function loadAnalytics(){

if(!analyticsBox) return;

analyticsBox.innerHTML = "Loading analytics...";

try{

const videosSnap = await getDocs(collection(db,"videos"));

totalVideos = videosSnap.size;

videosSnap.forEach(doc=>{

const data = doc.data();

totalLikes += data.likes || 0;

totalComments += data.comments || 0;

totalViews += data.views || 0;

});

showAnalytics();

}catch(e){

console.log("Analytics error:",e);

}

}


// SHOW ANALYTICS

function showAnalytics(){

analyticsBox.innerHTML = `

<div>Total Videos : ${totalVideos}</div>
<div>Total Views : ${totalViews}</div>
<div>Total Likes : ${totalLikes}</div>
<div>Total Comments : ${totalComments}</div>

`;

}


// TOP VIDEO FINDER

async function findTopVideo(){

const snap = await getDocs(collection(db,"videos"));

let topViews = 0;
let topVideo = null;

snap.forEach(doc=>{

const data = doc.data();

if((data.views || 0) > topViews){

topViews = data.views;
topVideo = data.video;

}

});

if(topVideo){

console.log("Top Video:",topVideo);

}

}


// SAVE ANALYTICS LOCAL

function saveAnalytics(){

const data = {

videos:totalVideos,
views:totalViews,
likes:totalLikes,
comments:totalComments

};

localStorage.setItem("analyticsData",JSON.stringify(data));

}


// LOAD LOCAL ANALYTICS

function loadLocalAnalytics(){

const saved = localStorage.getItem("analyticsData");

if(!saved) return;

try{

const data = JSON.parse(saved);

console.log("Local analytics:",data);

}catch(e){}

}


// AUTO REFRESH

setInterval(()=>{

loadAnalytics();

},20000);


loadAnalytics();
loadLocalAnalytics();
findTopVideo();
