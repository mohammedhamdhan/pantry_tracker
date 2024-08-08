// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyodnQaCYOgc0aXjx-1q7HalNQkOZokSM",
  authDomain: "hspantryapp-b26a3.firebaseapp.com",
  projectId: "hspantryapp-b26a3",
  storageBucket: "hspantryapp-b26a3.appspot.com",
  messagingSenderId: "164018189561",
  appId: "1:164018189561:web:7a0fdb0c960927ac919e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {firebaseConfig, app, firestore}