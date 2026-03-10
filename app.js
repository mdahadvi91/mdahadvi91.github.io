const videos = document.querySelectorAll("video");

videos.forEach(video => {

video.addEventListener("click", () => {

videos.forEach(v=>{
v.muted = true;
});

video.muted = false;
video.play();

});

});

window.addEventListener("scroll", ()=>{

videos.forEach(video=>{

const rect = video.getBoundingClientRect();

if(rect.top >= 0 && rect.bottom <= window.innerHeight){

video.play();

}else{

video.pause();
video.muted = true;

}

});

});
const likeBtn = document.getElementById("likeBtn");
const shareBtn = document.getElementById("shareBtn");

let likes = 0;

likeBtn.onclick = function(){

likes++;

likeBtn.innerText = "❤️ " + likes;

}

shareBtn.onclick = function(){

navigator.clipboard.writeText(window.location.href);

alert("Link Copied");

}
