import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
where
}

from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import {
getAuth
}

from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


const firebaseConfig = {

apiKey: "AIzaSyDAl3TMOxgMKvw-hjqmhEyNTUj2_I25bgk",

authDomain: "hridoy-er-apps-2ad7c.firebaseapp.com",

projectId: "hridoy-er-apps-2ad7c",

storageBucket: "hridoy-er-apps-2ad7c.firebasestorage.app",

messagingSenderId: "152919903520",

appId: "1:152919903520:web:5726d95dceeab535961b45"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);



/* LIKE FUNCTION */

window.likeVideo = async function(videoUrl,owner){

const user=auth.currentUser;

if(!user){

alert("Login first");

return;

}


/* save like */

await addDoc(collection(db,"likes"),{

video:videoUrl,
user:user.email

});


/* send notification */

await addDoc(collection(db,"notifications"),{

to:owner,
from:user.email,
type:"liked your video ❤️"

});

alert("Liked ❤️");

};



/* COUNT LIKES */

window.loadLikes = async function(videoUrl,element){

const q=query(collection(db,"likes"),where("video","==",videoUrl));

const snap=await getDocs(q);

element.innerText=snap.size;

};
