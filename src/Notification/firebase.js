// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAngPEGrZaDLnHwqF5D33Rky8nMNJAqHUM",
  authDomain: "notification-ba9b3.firebaseapp.com",
  projectId: "notification-ba9b3",
  storageBucket: "notification-ba9b3.firebasestorage.app",
  messagingSenderId: "366520298946",
  appId: "1:366520298946:web:831f31de8c975db3e2fa5b",
  measurementId: "G-S6PY5JZGHD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
