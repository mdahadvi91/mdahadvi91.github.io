// VIDEO EFFECTS LIBRARY

const previewVideo = document.getElementById("preview");
const effectSelect = document.getElementById("effectSelect");


// APPLY EFFECT
effectSelect.onchange = function(){

const effect = effectSelect.value;

if(!previewVideo) return;

if(effect === "none"){

previewVideo.style.filter = "none";

}else{

previewVideo.style.filter = effect;

}

};


// EFFECT PREVIEW LIST (OPTIONAL EXTEND)
const effects = [
"none",
"grayscale(1)",
"sepia(1)",
"contrast(1.5)",
"brightness(1.4)",
"hue-rotate(90deg)"
];


// FUNCTION TO ADD MORE EFFECTS
function addEffect(name,value){

const option = document.createElement("option");

option.text = name;

option.value = value;

effectSelect.appendChild(option);

}

window.addEffect = addEffect;
