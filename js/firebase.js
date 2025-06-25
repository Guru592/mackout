// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Mackout Brands Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDs-PrWFKcK7zQi916FzLEcTHK6Ipa0FKY",
  authDomain: "mackout-brands.firebaseapp.com",
  projectId: "mackout-brands",
  storageBucket: "mackout-brands.firebasestorage.app",
  messagingSenderId: "569797522351",
  appId: "1:569797522351:web:62c296a3f830fd625ff55a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messagesRef = collection(db, "messages"); // We'll use this later
