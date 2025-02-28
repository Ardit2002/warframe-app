// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0KiRcndxbTu8QBrYiZ7Xa5ab7G-Ucgo8",
  authDomain: "warframeapp-47469.firebaseapp.com",
  projectId: "warframeapp-47469",
  storageBucket: "warframeapp-47469.firebasestorage.app",
  messagingSenderId: "500270060763",
  appId: "1:500270060763:web:96b374397a6c30d50428fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app); // Authentication
const firestore = getFirestore(app); // Firestore database

// Export Firebase services for use in other parts of your app
export { auth, firestore };
