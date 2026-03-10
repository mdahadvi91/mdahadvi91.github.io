import { db } from "./firebase.js";
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const followBtn = document.getElementById("followBtn");

let profileId="defaultUser";

followBtn.onclick = async ()=>{

const ref = doc(db,"users",profileId);

await updateDoc(ref,{
followers:increment(1)
});

alert("Followed");

};
