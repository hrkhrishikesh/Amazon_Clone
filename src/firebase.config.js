// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxfi6GyZAYVhaqoUbYvnealOb3Mpvm2mU",
  authDomain: "users-hrk.firebaseapp.com",
  projectId: "users-hrk",
  storageBucket: "users-hrk.appspot.com",
  messagingSenderId: "116950109646",
  appId: "1:116950109646:web:864ea558b8d18858f52f9f",
  measurementId: "G-TC47FYEXW0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export default firebaseConfig
