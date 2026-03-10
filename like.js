let lastTap = 0;

document.addEventListener("click",function(e){

if(e.target.tagName==="VIDEO"){

const now = Date.now();

if(now - lastTap < 300){

const heart=document.createElement("div");
heart.innerHTML="❤️";

heart.style.position="absolute";
heart.style.fontSize="80px";
heart.style.left="50%";
heart.style.top="50%";
heart.style.transform="translate(-50%,-50%)";

e.target.parentElement.appendChild(heart);

setTimeout(()=>{
heart.remove();
},800);

}

lastTap = now;

}

});
