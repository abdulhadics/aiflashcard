// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa6S74oIw1ESKp9U-nMCfz89DjocaWfBU",
  authDomain: "flashcard-saas-3dfe3.firebaseapp.com",
  projectId: "flashcard-saas-3dfe3",
  storageBucket: "flashcard-saas-3dfe3.appspot.com",
  messagingSenderId: "308267096842",
  appId: "1:308267096842:web:ed32ab3ea4a3aa537138f3",
  measurementId: "G-NCBZDBDLCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;