import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';

//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACC_mzJlq0sFY6SjcfPgr8lB3B5qZBFzw",
  authDomain: "aypoo-db.firebaseapp.com",
  projectId: "aypoo-db",
  storageBucket: "aypoo-db.appspot.com",
  messagingSenderId: "840540565794",
  appId: "1:840540565794:web:e02d38891173d71232b57b",
  measurementId: "G-1H9S5LZKFN"
};

const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);