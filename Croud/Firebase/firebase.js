// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOX_iQiOdmvp-4fLyySPoDeWElEF1NYy4",
  authDomain: "croud-f0421.firebaseapp.com",
  projectId: "croud-f0421",
  storageBucket: "croud-f0421.appspot.com",
  messagingSenderId: "340757415555",
  appId: "1:340757415555:web:242b9363d4ab32f387fdb6",
  measurementId: "G-T2JVF9SG63",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const database = getFirestore();
