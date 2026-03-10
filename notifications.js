import { db, auth } from "./firebase.js";

import {
collection,
query,
where,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const notificationList = document.getElementById("notificationList");


// LOAD NOTIFICATIONS
auth.onAuthStateChanged((user)=>{

if(!user) return;

const q = query(
collection(db,"notifications"),
where("userId","==",user.uid)
);

onSnapshot(q,(snapshot)=>{

notificationList.innerHTML = "";

snapshot.forEach((doc)=>{

const data = doc.data();

const div = document.createElement("div");

div.className = "notification-item";

div.innerText = data.text;

notificationList.appendChild(div);

});

});

});
