// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-trip-planner-180f7.firebaseapp.com",
  projectId: "ai-trip-planner-180f7",
  storageBucket: "ai-trip-planner-180f7.firebasestorage.app",
  messagingSenderId: "791644464572",
  appId: "1:791644464572:web:2634612c70e120aa1e37b9",
  measurementId: "G-EF1J6MLM6B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
// const analytics = getAnalytics(app);