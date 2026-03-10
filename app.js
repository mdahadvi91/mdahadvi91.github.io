const videos = document.querySelectorAll("video");

videos.forEach(video => {

video.addEventListener("click", function(){

if(video.muted){

video.muted = false;

}else{

video.muted = true;

}

});

});
