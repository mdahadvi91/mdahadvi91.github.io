const feed = document.getElementById("video-feed");

const video = document.createElement("video");
video.src = "https://www.w3schools.com/html/mov_bbb.mp4";
video.controls = true;
video.autoplay = true;

feed.appendChild(video);
