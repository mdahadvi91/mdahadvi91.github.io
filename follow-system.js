import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

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



/* FOLLOW USER */

window.followUser = async function(targetUser){

const user = auth.currentUser;

if(!user){

alert("Login first");
return;

}

/* save follow */

await addDoc(collection(db,"follows"),{

from:user.email,
to:targetUser

});

/* send notification */

await addDoc(collection(db,"notifications"),{

to:targetUser,
from:user.email,
type:"started following you 👥"

});

alert("Followed");

};



/* UNFOLLOW USER */

window.unfollowUser = async function(targetUser){

const user = auth.currentUser;

const q = query(
collection(db,"follows"),
where("from","==",user.email),
where("to","==",targetUser)
);

const snap = await getDocs(q);

snap.forEach(async docItem=>{

await deleteDoc(docItem.ref);

});

alert("Unfollowed");

};



/* FOLLOW COUNT */

window.loadFollowers = async function(userEmail,element){

const q = query(
collection(db,"follows"),
where("to","==",userEmail)
);

const snap = await getDocs(q);

element.innerText = snap.size;

};
