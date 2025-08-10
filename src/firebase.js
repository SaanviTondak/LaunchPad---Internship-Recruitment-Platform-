// src/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from "firebase/analytics"
import { getStorage } from "firebase/storage"  

const firebaseConfig = {
  apiKey: "AIzaSyCC-tPCk99a1WS62dpP7WZ8MddmIQyMIWE",
  authDomain: "bt3103-final-project-52607.firebaseapp.com",
  projectId: "bt3103-final-project-52607",
  storageBucket: "bt3103-final-project-52607.appspot.com",
  messagingSenderId: "1093019220870",
  appId: "1:1093019220870:web:94b8c66b22319cfeba8a07",
  measurementId: "G-CNKYF8EVPR"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app) // ✅ Add this

// Initialize Analytics (optional)
let analytics = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app)
  }
}).catch(e => console.error("Analytics error:", e))


// Enable offline persistence (optional)
// Removing this as it can cause issues in development
// enableIndexedDbPersistence(db).catch((err) => {
//   console.error("Firestore persistence error:", err.code);
// });

export { app, auth, db, storage, analytics } 