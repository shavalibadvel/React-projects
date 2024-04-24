// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJI8SyGzWyHvFil-o66yZnbaZh2F3f-Q8",
  authDomain: "react-project-27492.firebaseapp.com",
  projectId: "react-project-27492",
  storageBucket: "react-project-27492.appspot.com",
  messagingSenderId: "722353502437",
  appId: "1:722353502437:web:58173cd5a5c2d855e53c0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider =new GoogleAuthProvider();
export const db=getFirestore(app);