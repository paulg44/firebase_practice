// Uses firebase in built functions to intialise the app using the variables apiKey authDomain etc which are stored in my env folder as not to be viewed on the client side
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
});

// Export the auth instance to be used in authentication related parts of the app
export const auth = getAuth(firebaseApp);
