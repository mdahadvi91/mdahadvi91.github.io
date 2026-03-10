import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("video-feed");

async function loadVideos() {

  feed.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "videos"));

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    const video = document.createElement("video");

    video.src = data.video;
    video.autoplay = true;
    video.loop = true;
    video.controls = true;
    video.playsInline = true;

    video.style.width = "100%";
    video.style.height = "100vh";
    video.style.objectFit = "cover";

    feed.appendChild(video);

  });

}

loadVideos();
