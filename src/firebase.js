import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAt9_-r6ByCbXZsxsD_sNtOBPOcmUXfZIY",
  authDomain: "mytube-717a5.firebaseapp.com",
  databaseURL: "https://mytube-717a5.firebaseio.com",
  projectId: "mytube-717a5",
  storageBucket: "mytube-717a5.appspot.com",
  messagingSenderId: "1073740003226",
  appId: "1:1073740003226:web:e0882dcb721092fad2ac23",
  measurementId: "G-7P577BLBHP"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();
const firestore = firebase.firestore();
const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const signIn = (email, password, callback) => {
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    callback(error);
  });
}

const signOut = (callback) => {
  auth.signOut().catch(function (error) {
    callback(error);
  });
}

const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export {
  auth,
  firestore,
  signIn,
  signInWithGoogle,
  generateUserDocument,
  signOut
}