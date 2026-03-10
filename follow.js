import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const followBtn = document.getElementById("followBtn");

followBtn.addEventListener("click", async ()=>{

await setDoc(doc(db,"follows","userFollow"),{
follow:true
});

alert("Followed");

});
