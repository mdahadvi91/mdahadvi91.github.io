import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

/* FIREBASE CONFIG */

const firebaseConfig = {
  apiKey: "AIzaSyDAl3TMOxgMKvw-hjqmhEyNTUj2_I25bgk",
  authDomain: "hridoy-er-apps-2ad7c.firebaseapp.com",
  projectId: "hridoy-er-apps-2ad7c",
  storageBucket: "hridoy-er-apps-2ad7c.appspot.com",
  messagingSenderId: "152919903520",
  appId: "1:152919903520:web:5726d95dceeab535961b45"
};

/* INIT APP */

const app = initializeApp(firebaseConfig);

/* SERVICES */

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* EXPORT */

export { auth, db, storage, onAuthStateChanged, signOut };
