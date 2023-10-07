// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB8xludZemLKpulKWabTfzDhwwaprOHKQ",
  authDomain: "expense-tracker-15825.firebaseapp.com",
  projectId: "expense-tracker-15825",
  storageBucket: "expense-tracker-15825.appspot.com",
  messagingSenderId: "1060578240198",
  appId: "1:1060578240198:web:da07a5c60f4a59081919c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database=getFirestore(app);