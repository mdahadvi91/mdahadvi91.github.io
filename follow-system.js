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

/* FOLLOW BUTTON */

window.followUser = async function(targetUser){

const user = auth.currentUser;

if(!user) return;

const q = query(
collection(db,"follows"),
where("from","==",user.email),
where("to","==",targetUser)
);

const snap = await getDocs(q);

/* already following */

if(!snap.empty){

snap.forEach(async doc=>{
await deleteDoc(doc.ref);
});

}

/* follow */

else{

await addDoc(collection(db,"follows"),{

from:user.email,
to:targetUser,
time:Date.now()

});

}

updateFollowers(targetUser);

}

/* FOLLOWERS COUNT */

window.updateFollowers = async function(user){

const q = query(
collection(db,"follows"),
where("to","==",user)
);

const snap = await getDocs(q);

const count = snap.size;

const el=document.getElementById("followers");

if(el){

el.innerText=count;

}

}
