// Firebase import
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


// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDAl3TMOxgMKvw-hjqmhEyNTUj2_I25bgk",
  authDomain: "hridoy-er-apps-2ad7c.firebaseapp.com",
  projectId: "hridoy-er-apps-2ad7c",
  storageBucket: "hridoy-er-apps-2ad7c.appspot.com",
  messagingSenderId: "152919903520",
  appId: "1:152919903520:web:5726d95dceeab535961b45",
  measurementId: "G-R0S25ZXRQ3"
};


// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);


// 🔹 Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// 🔹 Check Login
onAuthStateChanged(auth,(user)=>{

  if(!user){
    
    if(!window.location.pathname.includes("auth.html")){
      window.location.href = "auth.html";
    }

  }

});


// 🔹 Logout function
function logout(){
  signOut(auth).then(()=>{
    window.location.href="auth.html";
  });
}


// 🔹 Export
export { auth, db, storage, logout };
