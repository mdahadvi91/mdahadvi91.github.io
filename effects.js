const videoFeed = document.getElementById("video-feed");

let currentEffect = "none";


// APPLY EFFECT

function applyEffect(effect){

currentEffect = effect;

const videos = document.querySelectorAll("video");

videos.forEach(v=>{

if(effect==="none"){
v.style.filter="none";
}

if(effect==="blur"){
v.style.filter="blur(4px)";
}

if(effect==="dark"){
v.style.filter="brightness(0.6)";
}

if(effect==="light"){
v.style.filter="brightness(1.3)";
}

if(effect==="retro"){
v.style.filter="sepia(1)";
}

if(effect==="bw"){
v.style.filter="grayscale(1)";
}

});

}


// EFFECT BUTTONS

const blurBtn = document.getElementById("effectBlur");
const darkBtn = document.getElementById("effectDark");
const lightBtn = document.getElementById("effectLight");
const retroBtn = document.getElementById("effectRetro");
const bwBtn = document.getElementById("effectBW");
const resetBtn = document.getElementById("effectReset");


blurBtn?.addEventListener("click",()=>applyEffect("blur"));
darkBtn?.addEventListener("click",()=>applyEffect("dark"));
lightBtn?.addEventListener("click",()=>applyEffect("light"));
retroBtn?.addEventListener("click",()=>applyEffect("retro"));
bwBtn?.addEventListener("click",()=>applyEffect("bw"));
resetBtn?.addEventListener("click",()=>applyEffect("none"));


// EFFECT LIBRARY

const effectLibrary = [
"blur",
"dark",
"light",
"retro",
"bw"
];

function showEffectLibrary(){

console.log("Available effects:",effectLibrary);

}


// SAVE LAST EFFECT

function saveEffect(){

localStorage.setItem("videoEffect",currentEffect);

}

function loadEffect(){

const saved = localStorage.getItem("videoEffect");

if(saved){

applyEffect(saved);

}

}

document.addEventListener("click",saveEffect);

loadEffect();


// EFFECT ANALYTICS

let effectClicks = 0;

document.querySelectorAll("[id^='effect']").forEach(btn=>{

btn.addEventListener("click",()=>{

effectClicks++;

console.log("Effect used:",effectClicks);

});

});
