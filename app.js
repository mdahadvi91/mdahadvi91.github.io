const videos = document.querySelectorAll("video");

videos.forEach(video => {

video.addEventListener("click", () => {

video.muted = false;
video.play();

});

});

window.addEventListener("scroll", () => {

videos.forEach(video => {

const rect = video.getBoundingClientRect();

if(rect.top >= 0 && rect.top < window.innerHeight){

video.play();

}else{

video.pause();
video.muted = true;

}

});

});
