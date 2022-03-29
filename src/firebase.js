import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const apiKey = process.env.REACT_APP_FIREBASE_APIKEY;
const appId = process.env.REACT_APP_FIREBASE_APPID;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "instagram-clone-8d995.firebaseapp.com",
    projectId: "instagram-clone-8d995",
    storageBucket: "instagram-clone-8d995.appspot.com",
    messagingSenderId: "415177906886",
    appId: appId
  };


const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore();
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export default app