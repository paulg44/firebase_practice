import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import dotenv from "dotenv"
// dotenv.config()

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAOITHn47GdkY36we0kS4Ch9qYLH7rkql4",
  authDomain: "auth-development-617c7.firebaseapp.com",
  projectId: "auth-development-617c7",
  storageBucket: "auth-development-617c7.appspot.com",
  messagingSenderId: "754251437431",
  appId: "1:754251437431:web:71a76d675da5ceab68bd72",
});

export const auth = getAuth(firebaseApp);
