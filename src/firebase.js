import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyArOebVLf_PCuMzcYKCbcVEplre1M38M1o",
    authDomain: "instagram-clone-8d995.firebaseapp.com",
    projectId: "instagram-clone-8d995",
    storageBucket: "instagram-clone-8d995.appspot.com",
    messagingSenderId: "415177906886",
    appId: "1:415177906886:web:15277cecb111f0e91d55c7" 
  };


const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore();
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export default app
