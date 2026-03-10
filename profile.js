import { auth, db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const profileVideos = document.getElementById("profileVideos");

auth.onAuthStateChanged(async user=>{
  if(!user) return;

  const q = query(collection(db,"videos"), where("userId","==",user.uid));
  const snap = await getDocs(q);

  snap.forEach(d=>{
    const data = d.data();

    const video = document.createElement("video");
    video.src = data.video;
    video.controls = true;

    profileVideos.appendChild(video);
  });
});
