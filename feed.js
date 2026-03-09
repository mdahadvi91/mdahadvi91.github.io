import { db } from "./firebase.js";

import {
collection,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const feed=document.getElementById("feed");

async function load(){

const snap=await getDocs(collection(db,"posts"));

snap.forEach(docu=>{

const d=docu.data();

feed.innerHTML+=`

<div class="video">

<video autoplay loop muted src="${d.media}"></video>

<div class="side">

<button onclick="like('${docu.id}',${d.likes})">
❤️ ${d.likes}
</button>

</div>

<div class="caption">

<b>@${d.username}</b>

<p>${d.caption}</p>

</div>

</div>

`;

});

}

window.like=async function(id,current){

const refDoc=doc(db,"posts",id);

await updateDoc(refDoc,{
likes:current+1
});

location.reload();

}

load();
