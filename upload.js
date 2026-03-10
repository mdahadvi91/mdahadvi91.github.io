import { auth, db, storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("uploadVideo").onclick = async ()=>{

const file = document.getElementById("videoFile").files[0];
const user = auth.currentUser;

const name = Date.now()+"_"+file.name;

const storageRef = ref(storage,"videos/"+name);

await uploadBytes(storageRef,file);

const url = await getDownloadURL(storageRef);

await addDoc(collection(db,"videos"),{
video:url,
userId:user.uid,
likes:0,
views:0,
time:Date.now()
});

alert("Uploaded");

};
