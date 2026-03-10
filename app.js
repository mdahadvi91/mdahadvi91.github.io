const videos = document.querySelectorAll("#video-feed video");

// tap করলে sound on
videos.forEach(video => {

video.addEventListener("click", () => {

videos.forEach(v=>{
v.muted = true;
});

video.muted = false;
video.play();

});

});


// scroll করলে শুধু screen এর video play হবে
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
