let tool = ""
let files = []

function openTool(t){
tool = t
document.getElementById("fileInput").click()
}

document.addEventListener("DOMContentLoaded",()=>{

const input = document.createElement("input")
input.type = "file"
input.id = "fileInput"
input.multiple = true
input.accept = "image/*,.pdf"
input.style.display = "none"

document.body.appendChild(input)

input.addEventListener("change",e=>{
files=[...e.target.files]

if(files.length===0)return

runTool()
})

})

function runTool(){

if(tool==="jpgpng"){
convertImage("png")
}

if(tool==="pngjpg"){
convertImage("jpeg")
}

if(tool==="resize"){
resizeImage()
}

if(tool==="compress"){
compressImage()
}

if(tool==="rotate"){
rotateImage()
}

if(tool==="flip"){
flipImage()
}

if(tool==="base64"){
imageToBase64()
}

if(tool==="info"){
imageInfo()
}

if(tool==="qr"){
generateQR()
}

}

function convertImage(type){

const file=files[0]

const img=new Image()

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

canvas.toBlob(blob=>{

download(blob,"converted."+type)

},"image/"+type)

}

img.src=URL.createObjectURL(file)

}

function resizeImage(){

const file=files[0]

const img=new Image()

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.width/2
canvas.height=img.height/2

ctx.drawImage(img,0,0,canvas.width,canvas.height)

canvas.toBlob(blob=>{
download(blob,"resized.jpg")
},"image/jpeg")

}

img.src=URL.createObjectURL(file)

}

function compressImage(){

const file=files[0]

const img=new Image()

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

canvas.toBlob(blob=>{
download(blob,"compressed.jpg")
},"image/jpeg",0.5)

}

img.src=URL.createObjectURL(file)

}

function rotateImage(){

const file=files[0]

const img=new Image()

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.height
canvas.height=img.width

ctx.translate(canvas.width/2,canvas.height/2)
ctx.rotate(Math.PI/2)

ctx.drawImage(img,-img.width/2,-img.height/2)

canvas.toBlob(blob=>{
download(blob,"rotated.jpg")
})

}

img.src=URL.createObjectURL(file)

}

function flipImage(){

const file=files[0]

const img=new Image()

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.translate(canvas.width,0)
ctx.scale(-1,1)

ctx.drawImage(img,0,0)

canvas.toBlob(blob=>{
download(blob,"flipped.jpg")
})

}

img.src=URL.createObjectURL(file)

}

function imageToBase64(){

const file=files[0]

const reader=new FileReader()

reader.onload=function(){

alert(reader.result)

}

reader.readAsDataURL(file)

}

function imageInfo(){

const file=files[0]

alert(
"Name: "+file.name+
"\nSize: "+(file.size/1024).toFixed(2)+" KB"+
"\nType: "+file.type
)

}

function generateQR(){

const text=prompt("Enter text or link")

if(!text)return

const url="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+encodeURIComponent(text)

const a=document.createElement("a")
a.href=url
a.download="qr.png"
a.click()

}

function download(blob,name){

const a=document.createElement("a")
a.href=URL.createObjectURL(blob)
a.download=name
a.click()

}
