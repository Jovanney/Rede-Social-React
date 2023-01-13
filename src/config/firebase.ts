// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwIMMci6Fsl3mWfdWcD3frH-THEq0mCEc",
  authDomain: "react-couse-7b8aa.firebaseapp.com",
  projectId: "react-couse-7b8aa",
  storageBucket: "react-couse-7b8aa.appspot.com",
  messagingSenderId: "671275439448",
  appId: "1:671275439448:web:f87ca3d39831b42c8ec12d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);