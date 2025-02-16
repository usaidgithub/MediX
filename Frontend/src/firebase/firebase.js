// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,signInWithRedirect , getRedirectResult} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4q20hFha21HsdR-e04y1oXecRVp_N0Ds",
    authDomain: "medicalchatbot-274a9.firebaseapp.com",
    projectId: "medicalchatbot-274a9",
    storageBucket: "medicalchatbot-274a9.appspot.com",
    messagingSenderId: "672674695248",
    appId: "1:672674695248:web:e2925cf43954d2918a2955",
    measurementId: "G-TJXSFH25XV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithRedirect , getRedirectResult};

export {auth,app}