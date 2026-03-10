import { db } from "./firebase.js";
import {
collection,
addDoc,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const commentBtn = document.getElementById("commentBtn");
const commentBox = document.getElementById("commentBox");

let currentVideoId = "default";
let opened = false;

function openCommentBox(){

if(opened){
commentBox.style.display="none";
opened=false;
return;
}

commentBox.style.display="block";

commentBox.innerHTML = `
<input id="commentInput" placeholder="Write comment...">
<button id="sendComment">Send</button>
<div id="commentList"></div>
`;

loadComments();

document.getElementById("sendComment").onclick = sendComment;

opened=true;

}

async function sendComment(){

const input = document.getElementById("commentInput");

const text = input.value.trim();

if(text==="") return;

try{

await addDoc(collection(db,"comments"),{
video:currentVideoId,
text:text,
time:Date.now()
});

input.value="";

loadComments();

}catch(e){

console.log("Comment error:",e);

}

}

async function loadComments(){

const list = document.getElementById("commentList");

if(!list) return;

list.innerHTML="Loading...";

try{

const q = query(
collection(db,"comments"),
where("video","==",currentVideoId)
);

const snap = await getDocs(q);

list.innerHTML="";

if(snap.empty){

list.innerHTML="<div>No comments</div>";
return;

}

snap.forEach(doc=>{

const data = doc.data();

const div=document.createElement("div");

div.className="comment";

div.innerText=data.text;

list.appendChild(div);

});

}catch(e){

console.log("Load comment error:",e);

}

}

if(commentBtn){

commentBtn.onclick=openCommentBox;

}
