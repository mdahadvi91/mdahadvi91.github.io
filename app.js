const videos = document.querySelectorAll("#video-feed video");

// যখন user screen এ tap করবে
document.body.addEventListener("click", () => {

videos.forEach(v => {
v.muted = true;
});

// screen এ যেই video visible সেটার sound on
videos.forEach(video => {

const rect = video.getBoundingClientRect();

if(rect.top >= 0 && rect.bottom <= window.innerHeight){

video.muted = false;
video.play();

}

});

});


// scroll করলে auto play
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
