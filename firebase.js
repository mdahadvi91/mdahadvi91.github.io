import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const currentUser="user1"
const profileUser="user2"

const followBtn=document.getElementById("followBtn")

async function loadFollowStats(){

const followersRef=collection(db,"users",profileUser,"followers")
const followingRef=collection(db,"users",currentUser,"following")

const followersSnap=await getDocs(followersRef)
const followingSnap=await getDocs(followingRef)

document.getElementById("followers").innerText=followersSnap.size
document.getElementById("following").innerText=followingSnap.size

}

loadFollowStats()



followBtn.onclick=async ()=>{

const followDoc=doc(db,"users",profileUser,"followers",currentUser)

const followingDoc=doc(db,"users",currentUser,"following",profileUser)

const snap=await getDoc(followDoc)

if(snap.exists()){

await deleteDoc(followDoc)
await deleteDoc(followingDoc)

followBtn.innerText="Follow"

}else{

await setDoc(followDoc,{time:Date.now()})
await setDoc(followingDoc,{time:Date.now()})

followBtn.innerText="Following"

}

loadFollowStats()

}
const firebaseConfig = {
  apiKey: "AIzaSyDAl3TMOxgMKvw-hjqmhEyNTUj2_I25bgk",
  authDomain: "hridoy-er-apps-2ad7c.firebaseapp.com",
  projectId: "hridoy-er-apps-2ad7c",
  storageBucket: "hridoy-er-apps-2ad7c.firebasestorage.app",
  messagingSenderId: "152919903520",
  appId: "1:152919903520:web:5726d95dceeab535961b45",
  measurementId: "G-R0S25ZXRQ3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
