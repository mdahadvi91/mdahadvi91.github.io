/* ================= PARTICLES ================= */

var particles=document.getElementById("particles");

for(let i=0;i<70;i++){

let dot=document.createElement("div");
dot.className="dot";

dot.style.left=Math.random()*100+"%";
dot.style.animationDuration=(10+Math.random()*20)+"s";

particles.appendChild(dot);

}

/* ================= OPEN SITE ================= */

function openSite(){
document.getElementById("welcome").style.display="none";
document.getElementById("main").style.display="block";
}

var home=document.getElementById("app").innerHTML;

function goHome(){
document.getElementById("app").innerHTML=home;
}

/* ================= LOADER ================= */

function showLoader(){
let loader=document.getElementById("loader");
if(loader) loader.style.display="flex";
}

function hideLoader(){
let loader=document.getElementById("loader");
if(loader) loader.style.display="none";
}

/* ================= PROGRESS BAR ================= */

function showProgress(){

let bar=document.createElement("div");

bar.className="progress";

bar.innerHTML="<div class='progress-bar'></div>";

document.body.appendChild(bar);

let p=0;

let interval=setInterval(()=>{

p+=10;

bar.firstChild.style.width=p+"%";

if(p>=100){

clearInterval(interval);

setTimeout(()=>{
bar.remove();
},500);

}

},200);

}

/* ================= DARK MODE ================= */

function toggleMode(){

document.body.classList.toggle("light");

let btn=document.getElementById("modeToggle");

if(document.body.classList.contains("light")){

btn.innerHTML="☀ Day";

}else{

btn.innerHTML="🌙 Night";

}

}

/* ================= PDF PAGE ================= */

function openPDF(){

document.getElementById("app").innerHTML=`

<button class="back" onclick="goHome()">⬅ Back</button>

<div class="container">

<h2>PDF Tools</h2>

<div class="grid">

<div class="card" onclick="jpgPdf()">JPG → PDF</div>
<div class="card" onclick="pngPdf()">PNG → PDF</div>
<div class="card" onclick="pngJpg()">PNG → JPG</div>
<div class="card" onclick="jpgPng()">JPG → PNG</div>
<div class="card" onclick="mergeImages()">Merge Images → PDF</div>
<div class="card" onclick="pdfJpg()">PDF → JPG</div>

</div>

</div>
`;

}

/* ================= JPG → PDF ================= */

function jpgPdf(){

document.getElementById("app").innerHTML=`

<button class="back" onclick="openPDF()">⬅ Back</button>

<div class="center">

<h2>JPG → PDF</h2>

<input type="file" id="img">

<br><br>

<button onclick="convertJPG()">Convert</button>

</div>
`;

}

function convertJPG(){

let file=document.getElementById("img").files[0];

if(!file){
alert("Select image");
return;
}

let reader=new FileReader();

reader.onload=function(e){

let img=new Image();

img.onload=function(){

const { jsPDF }=window.jspdf;

let pdf=new jsPDF({
orientation:img.width>img.height?'l':'p',
unit:'px',
format:[img.width,img.height]
});

pdf.addImage(img,'JPEG',0,0,img.width,img.height);

pdf.save("image.pdf");

};

img.src=e.target.result;

};

reader.readAsDataURL(file);

}

/* ================= PNG → PDF ================= */

function pngPdf(){

document.getElementById("app").innerHTML=`

<button class="back" onclick="openPDF()">⬅ Back</button>

<div class="center">

<h2>PNG → PDF</h2>

<input type="file" id="png">

<br><br>

<button onclick="convertPNG()">Convert</button>

</div>
`;

}

function convertPNG(){

let file=document.getElementById("png").files[0];

if(!file){
alert("Select image");
return;
}

let reader=new FileReader();

reader.onload=function(e){

let img=new Image();

img.onload=function(){

const { jsPDF }=window.jspdf;

let pdf=new jsPDF({
orientation:img.width>img.height?'l':'p',
unit:'px',
format:[img.width,img.height]
});

pdf.addImage(img,'PNG',0,0,img.width,img.height);

pdf.save("image.pdf");

};

img.src=e.target.result;

};

reader.readAsDataURL(file);

}

/* ================= IMAGE TOOLS ================= */

function openImage(){

document.getElementById("app").innerHTML=`

<button class="back" onclick="goHome()">⬅ Back</button>

<div class="container">

<h2>Image Tools</h2>

<div class="grid">

<div class="card" onclick="resizeTool()">Resize Image</div>
<div class="card" onclick="compressTool()">Compress Image</div>
<div class="card" onclick="blurTool()">Blur Image</div>
<div class="card" onclick="cropTool()">Crop Image</div>

<div class="card" onclick="bgRemove()">Background Remover</div>
<div class="card" onclick="watermarkTool()">Add Watermark</div>
<div class="card" onclick="filterTool()">Color Filter</div>

</div>

</div>
`;

}

/* ================= RESIZE ================= */

function resizeTool(){

document.getElementById("app").innerHTML=`

<button class="back" onclick="openImage()">⬅ Back</button>

<div class="center">

<h2>Resize Image</h2>

<input type="file" id="img">

<br><br>

Width <input type="number" id="w">

Height <input type="number" id="h">

<br><br>

<button onclick="resizeImage()">Resize</button>

</div>
`;

}

function resizeImage(){

let file=document.getElementById("img").files[0];

if(!file){
alert("Select image");
return;
}

let w=document.getElementById("w").value;
let h=document.getElementById("h").value;

let reader=new FileReader();

reader.onload=function(e){

let img=new Image();

img.onload=function(){

let canvas=document.createElement("canvas");

canvas.width=w;
canvas.height=h;

let ctx=canvas.getContext("2d");

ctx.drawImage(img,0,0,w,h);

let link=document.createElement("a");

link.download="resized.png";
link.href=canvas.toDataURL();

link.click();

};

img.src=e.target.result;

};

reader.readAsDataURL(file);

}

/* ================= VIDEO PAGE ================= */

function openVideo(){

document.getElementById("app").innerHTML=`

<button class="back" onclick="goHome()">⬅ Back</button>

<div class="container">

<h2>Video Tools</h2>

<div class="grid">

<div class="card">Coming Soon</div>

</div>

</div>
`;

}
