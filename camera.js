const video = document.getElementById("camera");
const recordBtn = document.getElementById("recordBtn");

let mediaRecorder;
let chunks = [];
let stream;


// OPEN CAMERA
async function startCamera(){

try{

stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

video.srcObject = stream;

mediaRecorder = new MediaRecorder(stream);

mediaRecorder.ondataavailable = (e)=>{
chunks.push(e.data);
};

mediaRecorder.onstop = ()=>{

const blob = new Blob(chunks,{type:"video/mp4"});

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;
a.download = "recorded_video.mp4";

a.click();

};

}catch(err){

alert("Camera access denied");

}

}

startCamera();



// RECORD BUTTON
recordBtn.onclick = function(){

if(mediaRecorder.state === "inactive"){

chunks = [];

mediaRecorder.start();

recordBtn.innerText = "STOP";

recordBtn.style.background = "black";

}else{

mediaRecorder.stop();

recordBtn.innerText = "REC";

recordBtn.style.background = "red";

}

};
