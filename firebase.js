import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
