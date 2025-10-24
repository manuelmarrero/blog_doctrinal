// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgDwbxNFUH12APSWoNQMEmuESygXUv4_Q",
  authDomain: "legado-doctrinal-firebase.firebaseapp.com",
  databaseURL: "https://legado-doctrinal-firebase-default-rtdb.firebaseio.com",
  projectId: "legado-doctrinal-firebase",
  storageBucket: "legado-doctrinal-firebase.firebasestorage.app",
  messagingSenderId: "351990050057",
  appId: "1:351990050057:web:8d2c326f9a754d0b0837d8"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export { ref, push, onValue, remove, set, update, signInWithEmailAndPassword, onAuthStateChanged, signOut };