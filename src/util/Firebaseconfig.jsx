// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDJewCKiOEPk5tgKoYJB0gV8MNXCvK00ak",
  authDomain: "e-nura.firebaseapp.com",
  projectId: "e-nura",
  storageBucket: "e-nura.appspot.com",
  messagingSenderId: "1028698401130",
  appId: "1:1028698401130:web:1a0881e6f1b94bfa791d13",
  measurementId: "G-078V7MLPCM",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.auth();
const db = app.firestore();
export { db, firebaseAuth };
