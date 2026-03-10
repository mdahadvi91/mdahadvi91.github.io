const likeBtn = document.getElementById("likeBtn");
const shareBtn = document.getElementById("shareBtn");

let likes = 0;

likeBtn.onclick = function(){

likes++;

likeBtn.innerText = "❤️ " + likes;

}

shareBtn.onclick = function(){

navigator.clipboard.writeText(window.location.href);

alert("Link Copied");

}
