// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA9_8L2CVo83gOvPpnRkLrj28rUBj9fOY",
    authDomain: "ascendary-7ff38.firebaseapp.com",
    projectId: "ascendary-7ff38",
    storageBucket: "ascendary-7ff38.firebasestorage.app",
    messagingSenderId: "11714314511",
    appId: "1:11714314511:web:fedffac5eabbac109cfe7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)