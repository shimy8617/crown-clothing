import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data does no exists
    //create / set the document with the data from userAuth in my collection
    
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message)
      }
    }

    //if user data exists
    
    return userDocRef;
}
