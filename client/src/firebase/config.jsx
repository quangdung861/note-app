// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbsdjETagH0AYW2GtdAvTJhS_DQqPvkzs",
  authDomain: "note-app-new.firebaseapp.com",
  projectId: "note-app-new",
  storageBucket: "note-app-new.appspot.com",
  messagingSenderId: "82233821375",
  appId: "1:82233821375:web:29ec15f577d70356f65e0a",
  measurementId: "G-8DHR1PDEWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);