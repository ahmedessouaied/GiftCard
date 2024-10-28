// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_q0yVw6EYVNPtwbbG_Jkb_kOFW_SVDbM",
  authDomain: "giftcards-62598.firebaseapp.com",
  databaseURL: "https://giftcards-62598-default-rtdb.firebaseio.com",
  projectId: "giftcards-62598",
  storageBucket: "giftcards-62598.appspot.com",
  messagingSenderId: "200868239312",
  appId: "1:200868239312:web:38e16af451a0ab65c88bd5",
  measurementId: "G-K7RS4X32V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

 
export { app, auth }; 