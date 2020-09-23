import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_AUTHENTICATION_CONFIG);

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();
const firestore = firebase.firestore();
const storageRef = firebase.storage().ref();


const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const signIn = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    if (!user.emailVerified) {
      return {
        code: 'unverified',
        message: 'Your email address hasn\'t been verified',
        user
      };
    } else {
      return null;
    }
  } catch (error) {
    return {
      message: 'Your email or password is incorrect. Please try again.',
      ...error
    };
  }
}

const sendEmailVerification = async (user) => {
  try {
    await user.sendEmailVerification();
  } catch (error) {
    return error;
  }
}

const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    return error;
  }
}

const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await user.sendEmailVerification();
  }
  catch (error) {
    return (error);
  }
};

const sendResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email)
  } catch (error) {
    return error;
  }
};

const generateUserDocument = async (user, additionalData) => {
  if (user == null || !user.emailVerified)
    return;

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

const uploadFile = (file, uid) => {
  const name = autoId();
  var metadata = {
    customMetadata: {
      originName: file.name
    }
  };

  let fileRef = storageRef.child(`${uid}/${name}`);
  return fileRef.put(file, metadata)
};

const autoId = () => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(
      Math.floor(Math.random() * CHARS.length)
    )
  }
  return autoId
}

export {
  auth,
  createUserWithEmailAndPassword,
  signIn,
  signInWithGoogle,
  sendEmailVerification,
  generateUserDocument,
  signOut,
  sendResetEmail,
  uploadFile
}