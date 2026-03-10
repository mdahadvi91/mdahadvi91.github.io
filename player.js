const videos = document.querySelectorAll("video")

// autoplay on scroll
window.addEventListener("scroll",()=>{

videos.forEach(video=>{

const rect = video.getBoundingClientRect()

if(rect.top>=0 && rect.bottom<=window.innerHeight){

video.play()

}else{

video.pause()

}

})

})

// double tap like
videos.forEach(video=>{

video.addEventListener("dblclick",()=>{

const heart=document.createElement("div")
heart.innerHTML="❤️"
heart.style.position="absolute"
heart.style.fontSize="80px"
heart.style.left="50%"
heart.style.top="50%"
heart.style.transform="translate(-50%,-50%)"

video.parentElement.appendChild(heart)

setTimeout(()=>heart.remove(),700)

})

})

// buttons

document.querySelectorAll(".play").forEach(btn=>{

btn.onclick=()=>{

const video=btn.closest(".video-box").querySelector("video")

if(video.paused){
video.play()
btn.innerHTML="⏸"
}else{
video.pause()
btn.innerHTML="▶"
}

}

})

document.querySelectorAll(".back").forEach(btn=>{

btn.onclick=()=>{

const video=btn.closest(".video-box").querySelector("video")
video.currentTime -=5

}

})

document.querySelectorAll(".forward").forEach(btn=>{

btn.onclick=()=>{

const video=btn.closest(".video-box").querySelector("video")
video.currentTime +=5

}

})
