import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAdoxfKs-Bkmao6fiFqibKWVPm5x6_NVtI",
  authDomain: "shopping-aa421.firebaseapp.com",
  databaseURL: "https://shopping-aa421.firebaseio.com",
  projectId: "shopping-aa421",
  storageBucket: "shopping-aa421.appspot.com",
  messagingSenderId: "599878940192",
  appId: "1:599878940192:web:553b6ef3c2d28b4e5dee45",
  measurementId: "G-VCC9MXPC6X"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;