import {
getFirestore,
collection,
addDoc,
deleteDoc,
getDocs,
query,
where
}

from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { getAuth }

from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

/* LIKE BUTTON */

window.likeVideo = async function(videoId){

const user = auth.currentUser;

if(!user) return;

const q = query(
collection(db,"likes"),
where("video","==",videoId),
where("user","==",user.email)
);

const snap = await getDocs(q);

/* already liked */

if(!snap.empty){

snap.forEach(async doc=>{
await deleteDoc(doc.ref);
});

}

/* new like */

else{

await addDoc(collection(db,"likes"),{

video:videoId,
user:user.email,
time:Date.now()

});

}

updateLikes(videoId);

}

/* COUNT */

window.updateLikes = async function(videoId){

const q = query(
collection(db,"likes"),
where("video","==",videoId)
);

const snap = await getDocs(q);

const count = snap.size;

const el=document.getElementById("like_"+videoId);

if(el){

el.innerText=count;

}

}
