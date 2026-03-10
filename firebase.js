// FIREBASE IMPORT

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// FIREBASE CONFIG

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT.appspot.com",
messagingSenderId: "YOUR_SENDER_ID",
appId: "YOUR_APP_ID"
};


// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);


// SERVICES

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// CHECK LOGIN

onAuthStateChanged(auth,(user)=>{

if(!user){

if(!window.location.pathname.includes("auth.html")){
window.location.href="auth.html";
}

}

});


// LOGOUT

function logout(){

signOut(auth).then(()=>{

window.location.href="auth.html";

});

}


// EXPORT

export { auth, db, storage, logout };
