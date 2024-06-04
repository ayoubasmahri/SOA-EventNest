// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import getStorage function
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk9KZj_iGA78DPIwzUuEGV48F-HBOqSJU",
  authDomain: "soa2024.firebaseapp.com",
  projectId: "soa2024",
  storageBucket: "soa2024.appspot.com",
  messagingSenderId: "255707552366",
  appId: "1:255707552366:web:26749f590db4331092647f",
  measurementId: "G-VF6CLQ9VWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { firebaseConfig, storage, db, auth }; // Export both firebaseConfig and storage
