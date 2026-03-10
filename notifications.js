import { db } from "./firebase.js";
import {
collection,
getDocs,
query,
orderBy,
limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const box = document.getElementById("notificationBox");

async function loadNotifications(){

if(!box) return;

box.innerHTML="Loading...";

try{

const q = query(
collection(db,"notifications"),
orderBy("time","desc"),
limit(50)
);

const snap = await getDocs(q);

box.innerHTML="";

if(snap.empty){
box.innerHTML="<div>No notifications</div>";
return;
}

snap.forEach(doc=>{

const data = doc.data();

const div = document.createElement("div");

div.className="notification";

div.innerText = data.text;

box.appendChild(div);

});

}catch(e){

console.log("Notification error:",e);

box.innerHTML="Failed to load";

}

}

loadNotifications();


// REALTIME REFRESH SYSTEM

setInterval(()=>{

loadNotifications();

},10000);


// NOTIFICATION COUNTER

let notifyCount = 0;

function increaseNotify(){

notifyCount++;

console.log("Notifications:",notifyCount);

}

document.addEventListener("newNotification",increaseNotify);


// LOCAL CACHE

function saveLocalNotifications(list){

localStorage.setItem("notifications",JSON.stringify(list));

}

function loadLocalNotifications(){

const data = localStorage.getItem("notifications");

if(!data) return;

try{

const list = JSON.parse(data);

list.forEach(n=>{

const div=document.createElement("div");

div.className="notification";

div.innerText=n;

box?.appendChild(div);

});

}catch(e){}

}

loadLocalNotifications();
