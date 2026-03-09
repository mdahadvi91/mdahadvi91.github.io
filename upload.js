import { db,storage } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

window.upload=async function(){

const file=document.getElementById("video").files[0];

const caption=document.getElementById("caption").value;

const storageRef=ref(storage,"videos/"+Date.now()+file.name);

await uploadBytes(storageRef,file);

const url=await getDownloadURL(storageRef);

await addDoc(collection(db,"posts"),{

media:url,
caption:caption,
likes:0,
username:"user"

});

alert("Uploaded");

}
