// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATqglEZvZ3HuiwgQCFXRMBtoh8ZZ1gpEs",
  authDomain: "project-web-hust.firebaseapp.com",
  databaseURL: "https://project-web-hust-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-web-hust",
  storageBucket: "project-web-hust.firebasestorage.app",
  messagingSenderId: "307787594501",
  appId: "1:307787594501:web:ceac6db4e04617aa15156c",
  measurementId: "G-Q1802LC7G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the Firebase app instance if you need it elsewhere
export default app;

// If you want to use specific Firebase services, you can export them too
// For example, to use Firestore:
// import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);

// For Realtime Database:
import { getDatabase } from "firebase/database";
export const database = getDatabase(app);

// For Authentication:
// import { getAuth } from "firebase/auth";
// export const auth = getAuth(app); 