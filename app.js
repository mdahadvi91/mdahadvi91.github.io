const videos = document.querySelectorAll("#video-feed video");

// When user taps anywhere on screen
document.body.addEventListener("click", () => {

videos.forEach(v => {
v.muted = true;
});

// Unmute the video that is currently visible
videos.forEach(video => {

const rect = video.getBoundingClientRect();

if(rect.top >= 0 && rect.bottom <= window.innerHeight){

video.muted = false;
video.play();

}

});

});


// Auto play video on scroll
window.addEventListener("scroll", () => {

videos.forEach(video => {

const rect = video.getBoundingClientRect();

if(rect.top >= 0 && rect.bottom <= window.innerHeight){

video.play();

}else{

video.pause();
video.muted = true;

}

});

});
