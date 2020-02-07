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

export const saveUserProfile = async (userInfo, otherInfo) => {
  try {
    if(userInfo && userInfo.uid) {
      // Check if user doc exists
      const userRef = firestore.collection('users').doc(userInfo.uid);
      const userSnap = await userRef.get();
      if(!userSnap.exists) {
        const { displayName, email } = userInfo;
        const createdAt = new Date();
        const updatedAt = new Date();
        await userRef.set({ displayName, email, createdAt, updatedAt, ...otherInfo });
      }

      return userRef;
    }
  } catch(err) {
    console.log(`save user profile error: ${err}`);
    return null;
  }
};

export default firebase;