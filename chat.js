import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendChat");


async function loadMessages(){

if(!chatBox) return;

chatBox.innerHTML="Loading...";

try{

const q = query(
collection(db,"messages"),
orderBy("time","asc")
);

const snap = await getDocs(q);

chatBox.innerHTML="";

snap.forEach(doc=>{

const data = doc.data();

const div=document.createElement("div");

div.className="chat-msg";

div.innerText=data.text;

chatBox.appendChild(div);

});

chatBox.scrollTop=chatBox.scrollHeight;

}catch(e){

console.log("Chat load error:",e);

}

}


async function sendMessage(){

const text = chatInput.value.trim();

if(text==="") return;

try{

await addDoc(collection(db,"messages"),{
text:text,
time:Date.now()
});

chatInput.value="";

loadMessages();

}catch(e){

console.log("Send chat error:",e);

}

}


sendBtn?.addEventListener("click",sendMessage);

chatInput?.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){
sendMessage();
}

});


loadMessages();


// AUTO REFRESH CHAT

setInterval(()=>{

loadMessages();

},4000);


// MESSAGE COUNT

let msgCount=0;

sendBtn?.addEventListener("click",()=>{

msgCount++;

console.log("Messages sent:",msgCount);

});


// LOCAL CACHE

function saveLocalChat(msg){

let list = JSON.parse(localStorage.getItem("chatCache") || "[]");

list.push(msg);

localStorage.setItem("chatCache",JSON.stringify(list));

}

sendBtn?.addEventListener("click",()=>{

if(chatInput.value.trim()!==""){
saveLocalChat(chatInput.value);
}

});
