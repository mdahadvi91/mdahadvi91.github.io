//////////////////////////////////////
// OPEN SITE
//////////////////////////////////////

function openSite(){
document.getElementById("welcome").style.display="none"
document.getElementById("main").style.display="block"
}

//////////////////////////////////////
// GO HOME
//////////////////////////////////////

function goHome(){
document.getElementById("toolScreen").style.display="none"
document.getElementById("toolsPage").style.display="block"
}

//////////////////////////////////////
// OPEN TOOL
//////////////////////////////////////

function openTool(tool){

document.getElementById("toolsPage").style.display="none"
document.getElementById("toolScreen").style.display="block"

let area=document.getElementById("toolContent")

if(tool=="resize"){
area.innerHTML=toolLayout("Resize Image","resizeImage()",true)
}

if(tool=="compress"){
area.innerHTML=toolLayout("Compress Image","compressImage()",true)
}

if(tool=="rotate"){
area.innerHTML=toolLayout("Rotate Image","rotateImage()",true)
}

if(tool=="flip"){
area.innerHTML=toolLayout("Flip Image","flipImage()",true)
}

if(tool=="jpgpng"){
area.innerHTML=toolLayout("JPG → PNG","jpgToPng()",true)
}

if(tool=="pngjpg"){
area.innerHTML=toolLayout("PNG → JPG","pngToJpg()",true)
}

if(tool=="crop"){
area.innerHTML=toolLayout("Crop Image","cropImage()",true)
}

}

//////////////////////////////////////
// TOOL LAYOUT
//////////////////////////////////////

function toolLayout(title,func,canvas=true){

return `
<h2>${title}</h2>

<div class="dropArea" id="dropArea">
Drag & Drop Image
<br>or<br>
<input type="file" id="file">
</div>

<br>

<img id="preview" style="max-width:100%;display:none">

<br><br>

<button onclick="${func}">Convert</button>

<div id="loading" style="display:none">
Processing...
</div>

${canvas ? `<canvas id="canvas"></canvas>` : ``}
`
}

//////////////////////////////////////
// DRAG DROP SYSTEM
//////////////////////////////////////

document.addEventListener("change",function(e){

if(e.target.id=="file"){
previewFile(e.target.files[0])
}

})

document.addEventListener("dragover",e=>{
e.preventDefault()
})

document.addEventListener("drop",e=>{

let file=e.dataTransfer.files[0]

if(file){
previewFile(file)

let input=document.getElementById("file")
if(input) input.files=e.dataTransfer.files
}

})

//////////////////////////////////////
// PREVIEW
//////////////////////////////////////

function previewFile(file){

let img=document.getElementById("preview")

img.src=URL.createObjectURL(file)

img.style.display="block"

}

//////////////////////////////////////
// LOADING
//////////////////////////////////////

function showLoading(){
document.getElementById("loading").style.display="block"
}

function hideLoading(){
document.getElementById("loading").style.display="none"
}

//////////////////////////////////////
// IMAGE FUNCTIONS
//////////////////////////////////////

function resizeImage(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

showLoading()

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width/2
canvas.height=img.height/2

ctx.drawImage(img,0,0,canvas.width,canvas.height)

downloadCanvas(canvas,"resize.png")

hideLoading()

}

}

function compressImage(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

showLoading()

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

downloadCanvas(canvas,"compress.jpg","image/jpeg",0.5)

hideLoading()

}

}

function rotateImage(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.height
canvas.height=img.width

ctx.translate(canvas.width/2,canvas.height/2)
ctx.rotate(Math.PI/2)

ctx.drawImage(img,-img.width/2,-img.height/2)

downloadCanvas(canvas,"rotate.png")

}

}

function flipImage(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.scale(-1,1)
ctx.drawImage(img,-img.width,0)

downloadCanvas(canvas,"flip.png")

}

}

function jpgToPng(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

downloadCanvas(canvas,"image.png")

}

}

function pngToJpg(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

downloadCanvas(canvas,"image.jpg","image/jpeg",1)

}

}

function cropImage(){

let file=document.getElementById("file").files[0]
if(!file) return alert("Select image")

let img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=300

ctx.drawImage(img,0,0,300,300)

downloadCanvas(canvas,"crop.png")

}

}

//////////////////////////////////////
// DOWNLOAD HELPER
//////////////////////////////////////

function downloadCanvas(canvas,name,type="image/png",quality=1){

let link=document.createElement("a")

link.download=name

link.href=canvas.toDataURL(type,quality)

link.click()

}
