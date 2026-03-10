import { storage, db } from "./firebase.js";

import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const uploadBtn = document.getElementById("uploadVideo");

uploadBtn.addEventListener("click", async () => {

const file = document.getElementById("videoFile").files[0];

if (!file){
alert("Select video first");
return;
}

const uniqueName = Date.now() + "_" + file.name;

const storageRef = ref(storage, "videos/" + uniqueName);

await uploadBytes(storageRef, file);

const url = await getDownloadURL(storageRef);

await addDoc(collection(db,"videos"),{
video:url,
likes:0,
comments:0,
time:Date.now()
});

alert("Video uploaded successfully");

});
