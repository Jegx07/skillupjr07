// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjT2kd-5knr87MrAxPdP3B4yBTdkMi5wQ",
  authDomain: "skillupjr02.firebaseapp.com",
  projectId: "skillupjr02",
  storageBucket: "skillupjr02.firebasestorage.app",
  messagingSenderId: "217335987931",
  appId: "1:217335987931:web:4bfcdd1ea8a73efbec16fe",
  measurementId: "G-H65HEWEEMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };