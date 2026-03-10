import { auth, db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const profileVideos = document.getElementById("profileVideos");
const username = document.getElementById("username");

auth.onAuthStateChanged(async user=>{

if(!user){
location.href="auth.html";
return;
}

username.innerText = user.email;

const q = query(collection(db,"videos"), where("userId","==",user.uid));

const snap = await getDocs(q);

profileVideos.innerHTML="";

snap.forEach(d=>{

const v = document.createElement("video");

v.src = d.data().video;

v.controls = true;

profileVideos.appendChild(v);

});

});
