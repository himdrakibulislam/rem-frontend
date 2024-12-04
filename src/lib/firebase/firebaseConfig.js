// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth,  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth, RecaptchaVerifier, signInWithPhoneNumber };