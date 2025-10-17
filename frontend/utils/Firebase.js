
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginonecart-49e7e.firebaseapp.com",
  projectId: "loginonecart-49e7e",
  storageBucket: "loginonecart-49e7e.firebasestorage.app",
  messagingSenderId: "940063939365",
  appId: "1:940063939365:web:4c8f186a73c6fb822d18cc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}